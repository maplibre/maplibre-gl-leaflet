import { copyFile, mkdir } from 'node:fs/promises';
import { defineConfig } from 'rolldown';

var banner = '/* jshint esversion: 6, -W008, -W030, -W083 */\n// Generated from src/leaflet-maplibre-gl.mjs. Run `npm run build` to update.';
var copyTypes = {
    name: 'copy-types',
    closeBundle: async function () {
        await mkdir('dist', { recursive: true });
        await Promise.all([
            copyFile('src/leaflet-maplibre-gl.d.ts', 'dist/leaflet-maplibre-gl.d.ts'),
            copyFile('src/leaflet-maplibre-gl.d.ts', 'dist/leaflet-maplibre-gl.d.mts')
        ]);
    }
};

export default defineConfig({
    input: 'src/leaflet-maplibre-gl.mjs',
    external: ['leaflet', 'maplibre-gl'],
    transform: {
        target: 'es2015'
    },
    plugins: [copyTypes],
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
