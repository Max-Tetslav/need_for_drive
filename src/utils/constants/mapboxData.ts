export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API_KEY;

export const DEFAULT_COORDINATES_DATA: mapboxgl.AnySourceData = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [48.4, 54.325],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [48.37, 54.326],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [48.36, 54.3],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [48.38, 54.31],
        },
      },
    ],
  },
};

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
