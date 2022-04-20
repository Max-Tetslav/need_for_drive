import { GeoJSONSourceRaw, MapboxGeoJSONFeature } from 'mapbox-gl';
import { IGeoPoint } from '@models/mapData';
import { IPoint } from '@models/orderPageData';
import { GEOCODER_API } from '@utils/constants/mapboxData';

export const getGeocoderUrl = (searchPoint: string) => {
  return `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${GEOCODER_API}&geocode=${encodeURI(
    searchPoint,
  )}}`;
};

export const getGeoJsonObject = (
  coordinateList: number[],
  point: IPoint,
): IGeoPoint => ({
  type: 'Feature',
  properties: {
    description: `<strong>${point.name}</strong><p>${point.cityId.name},</br>${point.address}</p>`,
    address: JSON.stringify(point),
  },
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
