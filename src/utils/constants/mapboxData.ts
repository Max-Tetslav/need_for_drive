export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API_KEY;
export const REQUEST_HEADER_KEY = process.env.REACT_APP_REQUEST_HEADER_KEY;
export const GEOCODER_API = process.env.REACT_APP_GEOCODER_API_KEY;

export const MAPBOX_STYLES = 'mapbox://styles/mapbox/light-v10';

export const GEOPIN_STYLES: mapboxgl.AnyLayer = {
  id: 'circle',
  type: 'circle',
  source: 'points',
  paint: {
    'circle-color': '#fff',
    'circle-radius': 4,
    'circle-stroke-width': 5,
    'circle-stroke-color': '#0ec261',
  },
};
