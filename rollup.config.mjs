import { copyFile, mkdir } from 'node:fs/promises';

var banner = '/* jshint -W030 */\n// Generated from src/leaflet-maplibre-gl.mjs. Run `npm run build` to update.';
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

export default {
    input: 'src/leaflet-maplibre-gl.mjs',
    external: ['leaflet', 'maplibre-gl'],
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
            interop: 'compat',
            banner: banner
        },
        {
            file: 'dist/leaflet-maplibre-gl.mjs',
            format: 'es',
            exports: 'named',
            interop: 'compat',
            banner: banner
        }
    ]
};
