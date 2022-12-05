import * as L from 'leaflet';
import { Map as MaplibreGLMap, MapOptions as MaplibreGLOptions } from 'maplibre-gl';

declare module 'leaflet' {
    type LeafletMaplibreGLOptions = Omit<MaplibreGLOptions, "container">;

    class MaplibreGL extends L.Layer {
        constructor(options: LeafletMaplibreGLOptions);
        getMaplibreMap(): MaplibreGLMap
        getCanvas(): HTMLCanvasElement
        getSize(): L.Point
        getBounds(): L.LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maplibreGL(options: LeafletMaplibreGLOptions): MaplibreGL;

    export default L
}
