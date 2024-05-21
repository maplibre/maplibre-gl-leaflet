import * as L from 'leaflet';
import { Map as LibreGLMap, MapOptions as LibreGLMapOptions } from 'maplibre-gl';


declare module 'leaflet' {
    type LeafletMaplibreGLOptions = Omit<LibreGLMapOptions, "container">;

    class MaplibreGL extends L.Layer {
        constructor(options: LeafletMaplibreGLOptions);
        getMaplibreMap(): LibreGLMap
        getCanvas(): HTMLCanvasElement
        getSize(): L.Point
        getBounds(): L.LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maplibreGL(options: LeafletMaplibreGLOptions): MaplibreGL;

}
