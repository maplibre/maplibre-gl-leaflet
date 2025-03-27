# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Added

- Add attribution handling to the Leaflet layer based on the `attributionControl` option and the source's `attribution` property

## 0.1.0

### Fixed - 2025-03-24

- Fix [#64](https://github.com/maplibre/maplibre-gl-leaflet/issues/64) to allow this library to work with MapLibre GL JS v5.0.0. ([#66](https://github.com/maplibre/maplibre-gl-leaflet/pull/66))

## 0.0.22 - 2024-07-08

### Fixed

- Fix [#29](https://github.com/maplibre/maplibre-gl-leaflet/issues/58) - added missing guard for empty object

## 0.0.20 - 2023-09-19

### Added

- Add `mapbox-gl-js v3.x.x` to allowed versions in peerDependencies.

### Fixed

- Fix [#29](https://github.com/maplibre/maplibre-gl-leaflet/issues/29) - layer is mis-aligned with map when panning the map off screen ([#31](https://github.com/maplibre/maplibre-gl-leaflet/pulls/31))

## 0.0.19 - 2022-11-30

### Fixed

- round CSS translate values to avoid blurry tiles ([#41](https://github.com/maplibre/maplibre-gl-leaflet/issues/41)).

## 0.0.18 - 2022-11-11

### Fixed

- import MapOptions instead of obsolete MapboxOptions for compatibility with neuer maplibre-gl versions ([#25](https://github.com/maplibre/maplibre-gl-leaflet/issues/25)).

## 0.0.15 - 2021-07-08

### Added
- types definition

## 0.0.14 - 2020-11-24

### Fixed

- fix gl offset issue in low zoom level

## 0.0.13 - 2020-08-31

### Added
-  `.getPaneName()` method

### Fixed
- Allow gl tiles to be added to a custom pane defined in options

## 0.0.12 - 2020-03-27

### Fixed

- `accessToken` is now optional

## 0.0.11 - 2019-11-04

### Fixed

- ensure gl map is added to leaflet TilePane

## 0.0.10 - 2019-09-16

## Added

- `.getContainer()`, `.getSize()`, `getBounds()` and `getCanvas()` methods.

## Fixed

- internal code changes to bring it closer to other overlay layers.

## 0.0.9 - 2019-09-02

## Added

- Added `interactive` option to make `mapbox-gl` map events handling possible.
- added public accessor to `mapbox-gl` map object

## 0.0.8 - 2019-08-07

## Added

- Added a `padding` option to fix the grey backgrougd flickering around the edges of the map while panning/zooming
- bumped the libraries in examples

## 0.0.7 - 2019-07-01

### Fixed

- Ensure no blank/gray area is displayed when zooming out.

## 0.0.6 - 2019-05-07

### Fixed

- `.git` directory removed from npm tarball.

## 0.0.5 - 2019-05-01

### Added

- `leaflet` and `mapbox-gl-js` are now declared as peerDependencies.

## 0.0.4 - 2019-02-27

### Added

- UMD wrapper
- support for `pane` in constructor

### Fixed

- webkitTransitionEnd event crash

## 0.0.3 - 2017-04-18

### Added

- Improved support for older versions of `mapbox-gl-js`

## 0.0.2 - 2017-03-08

### Added

- Introduced support for Leaflet `v1.0.x`

## 0.7. - 2016-10-09

- Compatibility release for Leaflet `v0.7.x`
