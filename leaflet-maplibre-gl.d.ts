import * as L from 'leaflet';
import { Map, MapboxOptions } from 'maplibre-gl';

declare module 'leaflet' {
    class MaplibreGL extends L.Layer {
        constructor(options: MapboxOptions);
        getMaplibreMap(): Map
        getCanvas(): HTMLCanvasElement
        getSize(): L.Point
        getBounds(): L.LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maplibreGL(options: MapboxOptions): MaplibreGL;

}
