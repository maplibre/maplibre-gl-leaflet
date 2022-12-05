import { Layer, Point, LatLngBounds } from 'leaflet';
import { Map, MapOptions } from 'maplibre-gl';

declare module 'leaflet' {
    type LeafletMaplibreGLOptions = Omit<MapOptions, "container">;

    class MaplibreGL extends Layer {
        constructor(options: LeafletMaplibreGLOptions);
        getMaplibreMap(): Map
        getCanvas(): HTMLCanvasElement
        getSize(): Point
        getBounds(): LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maplibreGL(options: LeafletMaplibreGLOptions): MaplibreGL;
}
