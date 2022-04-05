import { IGeoPoint } from '@models/mapData';
import { GEOCODER_API } from '@utils/constants/mapboxData';
import { GeoJSONSourceRaw, MapboxGeoJSONFeature } from 'mapbox-gl';

export const getGeocoderUrl = (searchPoint: string) => {
  return `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${GEOCODER_API}&geocode=${encodeURI(
    searchPoint,
  )}}`;
};

export const getGeoJsonObject = (coordinateList: number[]): IGeoPoint => ({
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Point',
    coordinates: coordinateList,
  },
});

export const getGeoJsonObjectList = (
  pointsList: IGeoPoint[],
): GeoJSONSourceRaw => ({
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: pointsList as MapboxGeoJSONFeature[],
  },
});
