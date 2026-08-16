import { copyFile, mkdir } from 'node:fs/promises';
import { defineConfig } from 'rolldown';

var banner = '/* jshint esversion: 6, -W008, -W030, -W083 */\n// Generated from src/leaflet-maplibre-gl.mjs. Run `npm run build` to update.';
var copyArtifacts = {
    name: 'copy-artifacts',
    closeBundle: async function () {
        await mkdir('dist', { recursive: true });
        await Promise.all([
            copyFile('src/leaflet-maplibre-gl.d.ts', 'dist/leaflet-maplibre-gl.d.ts'),
            copyFile('src/leaflet-maplibre-gl.d.ts', 'dist/leaflet-maplibre-gl.d.mts'),
            copyFile('src/leaflet-maplibre-gl.d.ts', 'leaflet-maplibre-gl.d.ts'),
            copyFile('dist/leaflet-maplibre-gl.js', 'leaflet-maplibre-gl.js')
        ]);
    }
};

export default defineConfig({
    input: 'src/leaflet-maplibre-gl.mjs',
    external: ['leaflet', 'maplibre-gl'],
    transform: {
        target: 'es2015'
    },
    plugins: [copyArtifacts],
    output: [
        {
            file: 'dist/leaflet-maplibre-gl.js',
            format: 'umd',
            name: 'MaplibreGLLeaflet',
            exports: 'named',
            globals: {
                leaflet: 'L',
                'maplibre-gl': 'maplibregl'
            },
            generatedCode: {
                preset: 'es5'
            },
            banner: banner
        },
        {
            file: 'dist/leaflet-maplibre-gl.mjs',
            format: 'es',
            exports: 'named',
            banner: banner
        }
    ]
});
