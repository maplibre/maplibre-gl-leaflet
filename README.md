## MapLibre GL Leaflet

This is a binding from [MapLibre GL JS](https://maplibre.org) to the familiar
[Leaflet](http://leafletjs.com/) API. It was originally developed for Mapbox (https://github.com/mapbox/mapbox-gl-leaflet) and was migrated to MapLibre after Mapbox changed changed its license.

## Code example
```javascript

var map = L.map('map').setView([38.912753, -77.032194], 15);
L.marker([38.912753, -77.032194])
    .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
    .addTo(map)
    .openPopup();
var gl = L.maplibreGL({
    style: 'mapbox://styles/mapbox/bright-v8'
}).addTo(map);
```
Note that you can use any vector tile source useable by maplibre-gl. For instance, you can use [OSM2VectorTiles](http://osm2vectortiles.org/) with:
```javascript
var gl = L.maplibreGL({
	style: 'https://api.maptiler.com/maps/topo/style.json?key=<YOUR_MAPTILER_API_KEY>'
}).addTo(map);
```

Once you have created the leaflet layer, the maplibre-gl map object can be accessed using
```javascript
gl.getMaplibreMap()....
// add a source to the maplibre-gl layer
gl.getMaplibreMap().addSource({...})
```

## Live examples
[Basic example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/aa06e210ab8f8ea136407a8f1481b4b8077c3d5a/examples/basic.html)

[Cluster example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/aa06e210ab8f8ea136407a8f1481b4b8077c3d5a/examples/cluster.html)

[Map events example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/aa06e210ab8f8ea136407a8f1481b4b8077c3d5a/examples/events.html)

Code for these examples is hosted in the [examples folder](https://github.com/maplibre/maplibre-gl-leaflet/tree/main/examples)

## Installation
Add a script tag referencing maplibre-gl-leaflet after adding leaflet and maplibre-gl-js in your website:
```html
<!-- Leaflet -->
<link rel="stylesheet" href="leaflet.css" />
<script src="leaflet.js"></script>

<!-- MapLibre GL -->
<link href="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.css" rel='stylesheet' />
<script src="https://unpkg.com/maplibre-gl@1.14.0/dist/maplibre-gl.js"></script>

<script src="leaflet-maplibre-gl.js"></script>
```

## Motivation
This project makes it possible to easily add a maplibre-gl-js layer in your Leaflet map. When using maplibre-gl-leaflet, you won't be able to use some of the maplibre-gl-js features.
Here are the main differences between a "pure" maplibre-gl-js map and a Leaflet map using maplibre-gl-leaflet:
- No rotation / bearing / pitch support
- Slower performances: When using maplibre-gl-leaflet, maplibre-gl-js is set as not interactive. Leaflet receives the touch/mouse events and updates the maplibre-gl-js map behind the scenes. Because maplibre-gl-js doesn't redraw as fast as Leaflet, the map can seem slower.

On the bright side, the maplibre-gl-leaflet binding will allow you to use all the leaflet features and plugins.

If you only need the maplibre-gl-js features ([adding a map with a mapbox-style, adding a GeoJSON, etc.](https://maplibre.org/maplibre-gl-js-docs/example/)), you are probably better off using it directly.

## API Reference
[API Reference](API.md)

## Bug Reports & Feature Requests
Please use the [issue tracker](https://github.com/maplibre/maplibre-gl-leaflet/issues) to report any bugs or file feature requests.
You can fork this [jsfiddle template](https://jsfiddle.net/fnicollet/9w9er53v/) to reproduce a bug, then share the URL of your fork in the GitHub issue.

## Licence
ISC © [MapLibre](https://github.com/maplibre) © [Mapbox](https://github.com/mapbox)
