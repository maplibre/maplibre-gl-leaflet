## `L.maplibreGL(options)`

Create a new MapLibre GL layer in a Leaflet-compatible wrapper.

<span class='leaflet icon'>_Extends_: `L.Class`</span>

`options` is an object of options. All options given are passed to a MapLibre GL `Map` object,
so consult [the MapLibre GL .Map documentation](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)
for the full range.

| Option | Value | Description |
| ---- | ---- | ---- |
| padding | number | [0.15] | Relative padding of the maplibre-gl layer to avoid the background flickering around the edges of the map |
| interactive | boolean | [false] | Wheter or not to register the mouse and keyboard events on the maplibre-gl layer. Turn this on if you intend to use the maplibre-gl layer events. |

### `layer.addTo(map)`

Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.

### `layer.getMaplibreMap(): maplibre.Map`

Returns `maplibre-gl.Map` object.

### `layer.getContainer(): HTMLDivElement`

Returns layer's DOM container `div`.

### `layer.getCanvas(): HTMLCanvasElement`

Returns `maplibre-gl.Map` canvas.

### `layer.getSize(): L.Point`

Returns layer size in pixels including padding.

### `layer.getBounds(): L.LatLngBounds`

Returns layer bounds including padding.

### `layer.getPaneName(): string`

Returns the pane name set in options if it is a valid pane, defaults to tilePane.
