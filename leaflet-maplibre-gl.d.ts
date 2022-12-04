import * as L from 'leaflet';
import { Map, MapOptions as MaplibreGLOptions } from 'maplibre-gl';

declare module 'leaflet' {
    type LeafletMaplibreGLOptions = Omit<MaplibreGLOptions, "container">;

    class MaplibreGL extends L.Layer {
        constructor(options: LeafletMaplibreGLOptions);
        getMaplibreMap(): Map
        getCanvas(): HTMLCanvasElement
        getSize(): L.Point
        getBounds(): L.LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maplibreGL(options: LeafletMaplibreGLOptions): MaplibreGL;

    export default L
}
