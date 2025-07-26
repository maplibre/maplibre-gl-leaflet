## MapLibre GL Leaflet

This is a binding from [MapLibre GL JS](https://maplibre.org) to the familiar
[Leaflet](http://leafletjs.com/) API. It was originally developed for Mapbox (<https://github.com/mapbox/mapbox-gl-leaflet>) and was migrated to MapLibre after Mapbox changed its license.

## Code example

```javascript
var map = L.map("map", {
    maxBounds: [[180, -Infinity], [-180, Infinity]], // restrict bounds to avoid max latitude issues with MapLibre GL
    maxBoundsViscosity: 1, // make the max bounds "solid" so users cannot pan past them
    minZoom: 1 // prevent sync issues at zoom 0
  }).setView([38.912753, -77.032194], 15);

L.marker([38.912753, -77.032194])
  .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
  .addTo(map)
  .openPopup();

var gl = L.maplibreGL({
  style: "mapbox://styles/mapbox/bright-v8",
}).addTo(map);
```

Note that you can use any vector tile source useable by maplibre-gl. For instance, you can use [OSM2VectorTiles](http://osm2vectortiles.org/) with:

```javascript
var gl = L.maplibreGL({
  style:
    "https://api.maptiler.com/maps/topo/style.json?key=<YOUR_MAPTILER_API_KEY>",
}).addTo(map);
```

Once you have created the leaflet layer, the maplibre-gl map object can be accessed using

```javascript
gl.getMaplibreMap()....
// add a source to the maplibre-gl layer
gl.getMaplibreMap().addSource({...})
```

## Live examples

[Basic example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/main/examples/basic.html)

[Cluster example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/main/examples/cluster.html)

[Map events example](https://raw.githack.com/maplibre/maplibre-gl-leaflet/main/examples/events.html)

Code for these examples is hosted in the [examples folder](https://github.com/maplibre/maplibre-gl-leaflet/tree/main/examples)

## Installation

Add a script tag referencing maplibre-gl-leaflet after adding leaflet and maplibre-gl-js in your website:

```html
<!-- Leaflet -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
/>
<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"></script>

<!-- Maplibre GL -->
<link
  href="https://unpkg.com/maplibre-gl@2.2.1/dist/maplibre-gl.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/maplibre-gl@2.2.1/dist/maplibre-gl.js"></script>

<script src="https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.0.20/leaflet-maplibre-gl.js"></script>
```

## Motivation

This project makes it possible to easily add a maplibre-gl-js layer in your Leaflet map. When using maplibre-gl-leaflet, you won't be able to use some of the maplibre-gl-js features.
Here are the main differences between a "pure" maplibre-gl-js map and a Leaflet map using maplibre-gl-leaflet:

- No rotation / bearing / pitch support
- Slower performances: When using maplibre-gl-leaflet, maplibre-gl-js is set as not interactive. Leaflet receives the touch/mouse events and updates the maplibre-gl-js map behind the scenes. Because maplibre-gl-js doesn't redraw as fast as Leaflet, the map can seem slower.
- MapLibre restricts the maximum latitude of the map in a stricter way then Leaflet. In order to maximize compatibility it it is recommended to set a `maxBounds: [[180, -Infinity], [-180, Infinity]]` and `maxBoundsViscosity: 1` on your Leaflet `Map` to prevent users from panning past the minimum and maximum latitude supported by MapLibre.
- Setting `minZoom: 1` is also recommended to reduce some issues with the map syncing at zoom level 0.

On the bright side, the maplibre-gl-leaflet binding will allow you to use all the leaflet features and plugins.

If you only need the maplibre-gl-js features ([adding a map with a mapbox-style, adding a GeoJSON, etc.](https://maplibre.org/maplibre-gl-js/docs/examples/)), you are probably better off using it directly.

## API Reference

[API Reference](API.md)

## Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/maplibre/maplibre-gl-leaflet/issues) to report any bugs or file feature requests.
You can fork this [jsfiddle template](https://jsfiddle.net/fnicollet/9w9er53v/) to reproduce a bug, then share the URL of your fork in the GitHub issue.

## License

ISC © [MapLibre](https://github.com/maplibre) © [Mapbox](https://github.com/mapbox)
