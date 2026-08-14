import * as L from 'leaflet';
import maplibreGL, {
    MaplibreGL,
    maplibreGL as createMaplibreLayer
} from '@maplibre/maplibre-gl-leaflet';
import type { Map as MaplibreMap } from 'maplibre-gl';

const options: L.LeafletMaplibreGLOptions = {
    style: {
        version: 8,
        sources: {},
        layers: []
    }
};

const defaultLayer: L.MaplibreGL = maplibreGL(options);
const namedLayer: L.MaplibreGL = createMaplibreLayer(options);
const constructedLayer: L.MaplibreGL = new MaplibreGL(options);
const maplibreMap: MaplibreMap = defaultLayer.getMaplibreMap();

void namedLayer;
void constructedLayer;
void maplibreMap;
