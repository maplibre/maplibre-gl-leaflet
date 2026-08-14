var assert = require('node:assert/strict');
var fs = require('node:fs');
var path = require('node:path');
var test = require('node:test');
var vm = require('node:vm');

function loadPlugin(relativePath) {
    var leaflet = {
        Layer: {
            extend: function (definition) {
                function Layer() {}
                Layer.prototype = definition;
                return Layer;
            }
        }
    };
    var maplibregl = {
        LngLat: {
            convert: function (center) {
                return center;
            }
        }
    };
    var module = { exports: {} };
    var filename = path.join(__dirname, '..', relativePath || 'dist/leaflet-maplibre-gl.js');

    vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
        exports: module.exports,
        module: module,
        require: function (name) {
            return name === 'leaflet' ? leaflet : maplibregl;
        }
    });

    return {
        leaflet: leaflet,
        plugin: module.exports
    };
}

function createLayer(plugin) {
    var layer = Object.create(plugin.MaplibreGL.prototype);
    layer._map = {
        getCenter: function () {
            return { lng: 7, lat: 46 };
        },
        getZoom: function () {
            return 9;
        }
    };
    return layer;
}

function createTransformUpdate() {
    return {
        setCenter: function (center) {
            this.center = center;
        },
        setZoom: function (zoom) {
            this.zoom = zoom;
        }
    };
}

test('exports and installs both plugin entry points', function () {
    var loaded = loadPlugin();

    assert.equal(loaded.leaflet.MaplibreGL, loaded.plugin.MaplibreGL);
    assert.equal(loaded.leaflet.maplibreGL, loaded.plugin.maplibreGL);
    assert.ok(loaded.plugin.maplibreGL() instanceof loaded.plugin.MaplibreGL);
});

test('keeps the root UMD compatibility entry', function () {
    var loaded = loadPlugin('leaflet-maplibre-gl.js');

    assert.equal(loaded.leaflet.MaplibreGL, loaded.plugin.MaplibreGL);
    assert.equal(loaded.leaflet.maplibreGL, loaded.plugin.maplibreGL);
});

test('synchronizes MapLibre GL JS v5 camera state', function () {
    var plugin = loadPlugin().plugin;
    var layer = createLayer(plugin);
    var update = createTransformUpdate();
    var applied;
    var moveEvents = 0;
    var gl = {
        transform: {
            apply: function (transform) {
                applied = transform;
            }
        },
        _getTransformForUpdate: function () {
            return update;
        },
        _fireMoveEvents: function () {
            moveEvents++;
        }
    };

    layer._transformGL(gl);

    assert.deepEqual(Array.from(update.center), [7, 46]);
    assert.equal(update.zoom, 8);
    assert.equal(applied, update);
    assert.equal(moveEvents, 1);
    assert.equal(layer._getGLTransform(gl), gl.transform);
});

test('synchronizes MapLibre GL JS v6 camera state', function () {
    var plugin = loadPlugin().plugin;
    var layer = createLayer(plugin);
    var update = createTransformUpdate();
    var applied;
    var moveEvents = 0;
    var camera = {
        transform: {
            marker: 'v6-transform'
        },
        getTransformForUpdate: function () {
            return update;
        },
        applyUpdatedTransform: function (transform) {
            applied = transform;
        },
        _fireMoveEvents: function () {
            moveEvents++;
        }
    };
    var gl = { _camera: camera };

    layer._transformGL(gl);

    assert.deepEqual(Array.from(update.center), [7, 46]);
    assert.equal(update.zoom, 8);
    assert.equal(applied, update);
    assert.equal(moveEvents, 1);
    assert.equal(layer._getGLTransform(gl), camera.transform);
});

test('package metadata exposes the ESM build and MapLibre GL JS v6', function () {
    var packageJson = require('../package.json');

    assert.equal(packageJson.version, '0.1.4');
    assert.equal(packageJson.main, 'leaflet-maplibre-gl.js');
    assert.equal(packageJson.module, 'dist/leaflet-maplibre-gl.mjs');
    assert.equal(packageJson.types, 'leaflet-maplibre-gl.d.ts');
    assert.equal(packageJson.exports['.'].import.default, './dist/leaflet-maplibre-gl.mjs');
    assert.equal(packageJson.exports['.'].require.default, './leaflet-maplibre-gl.js');
    assert.equal(packageJson.exports['./leaflet-maplibre-gl'].default, './leaflet-maplibre-gl.js');
    assert.equal(packageJson.exports['./leaflet-maplibre-gl.js'].default, './leaflet-maplibre-gl.js');
    assert.equal(packageJson.exports['./*'], './*');
    assert.match(packageJson.peerDependencies['maplibre-gl'], /\^6\.0\.0/);
});

test('loads the ESM build with the installed MapLibre GL JS v6 peer', async function () {
    var previousWindow = global.window;
    var previousDocument = global.document;
    var previousScreen = global.screen;
    var createdNavigator = !global.navigator;

    global.window = global;
    global.screen = { deviceXDPI: 1, logicalXDPI: 1 };
    global.document = {
        documentElement: { style: {} },
        createElement: function () {
            return { getContext: function () {}, style: {} };
        }
    };
    if (createdNavigator) {
        global.navigator = { platform: '', userAgent: '' };
    }

    try {
        var plugin = await import('@maplibre/maplibre-gl-leaflet');
        var maplibreVersion = require('../node_modules/maplibre-gl/package.json').version;

        assert.equal(typeof plugin.MaplibreGL, 'function');
        assert.equal(typeof plugin.maplibreGL, 'function');
        assert.equal(maplibreVersion.split('.')[0], '6');
    } finally {
        global.window = previousWindow;
        global.document = previousDocument;
        global.screen = previousScreen;
        if (createdNavigator) {
            delete global.navigator;
        }
    }
});
