var assert = require('node:assert/strict');
var fs = require('node:fs');
var test = require('node:test');
var vm = require('node:vm');

function loadPlugin() {
    var leaflet = {
        Layer: {
            extend: function (definition) {
                function Layer() {}
                Layer.prototype = definition;
                return Layer;
            }
        }
    };
    var maplibregl = {};
    var module = { exports: {} };
    var filename = require.resolve('@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl');

    vm.runInNewContext(fs.readFileSync(filename, 'utf8'), {
        exports: module.exports,
        module: module,
        require: function (name) {
            if (name === 'leaflet') {
                return leaflet;
            }
            assert.equal(name, 'maplibre-gl');
            return maplibregl;
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

test('keeps the existing UMD API and updates MapLibre through jumpTo', function () {
    var loaded = loadPlugin();

    assert.equal(loaded.leaflet.MaplibreGL, loaded.plugin.MaplibreGL);
    assert.equal(loaded.leaflet.maplibreGL, loaded.plugin.maplibreGL);
    assert.ok(loaded.plugin.maplibreGL() instanceof loaded.plugin.MaplibreGL);

    var layer = createLayer(loaded.plugin);
    var view;
    var gl = {
        jumpTo: function (options) {
            view = options;
        }
    };

    layer._transformGL(gl);

    assert.deepEqual(Array.from(view.center), [7, 46]);
    assert.equal(view.zoom, 8);
});

function createRemovableLayer(plugin) {
    var layer = createLayer(plugin);
    var container = {};
    var pane = {
        removeChild: function (child) {
            assert.equal(child, container);
        }
    };
    layer.options = { pane: 'tilePane' };
    layer._container = container;
    layer._map = {
        _proxy: null,
        options: {},
        getPane: function () {
            return pane;
        }
    };
    return layer;
}

test('removes a layer whose GL map never initialised without throwing', function () {
    var layer = createRemovableLayer(loadPlugin().plugin);
    // new maplibregl.Map() threw inside onAdd (no WebGL), so _glMap was never assigned.

    assert.doesNotThrow(function () {
        layer.onRemove(layer._map);
    });
    assert.equal(layer._glMap, null);
});

test('removes an initialised GL map exactly once', function () {
    var layer = createRemovableLayer(loadPlugin().plugin);
    var removed = 0;
    layer._glMap = {
        remove: function () {
            removed += 1;
        }
    };

    layer.onRemove(layer._map);

    assert.equal(removed, 1);
    assert.equal(layer._glMap, null);
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
        var maplibreVersion = require('maplibre-gl/package.json').version;

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
