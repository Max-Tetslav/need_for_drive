import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  DEFAULT_ZOOM,
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '@utils/constants/locationData';
import {
  MAPBOX_API,
  MAPBOX_STYLES,
  GEOPIN_STYLES,
} from '@utils/constants/mapboxData';
import needForDriveApi from '@services/needForDriveAPI';
import { IPoint } from '@models/orderPageData';
import { IGeoPoint } from '@models/mapData';
import {
  getGeocoderUrl,
  getGeoJsonObject,
  getGeoJsonObjectList,
} from '@utils/helpers/locationHelpers';
import 'mapbox-gl/src/css/mapbox-gl.css';
import { useAppDispatch, useAppSelector } from '@store/store';
import {
  updateAddress,
  updateCity,
  updatePoint,
} from '@store/reducers/orderDetailsReducer';
import cl from './Map.module.scss';

const Map: React.FC = () => {
  const dispatch = useAppDispatch();
  mapboxgl.accessToken = MAPBOX_API as string;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();
  const [centerLng, setCenterLng] = useState(DEFAULT_LNG);
  const [centerLat, setCenterLat] = useState(DEFAULT_LAT);
  const [mapZoom] = useState(DEFAULT_ZOOM);
  const pointState = useAppSelector((state) => state.orderDetails.point);

  let { data } = needForDriveApi.useGetPointsListQuery('');
  const points = [] as IGeoPoint[];

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: MAPBOX_STYLES,
      center: [centerLng, centerLat],
      zoom: mapZoom,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav);

    // map.addControl(new mapboxgl.NavigationControl());

    map.current.on('load', () => {
      // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
      (map.current as mapboxgl.Map).on('mouseenter', 'circle', () => {
        (map.current as mapboxgl.Map).getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      (map.current as mapboxgl.Map).on('mouseleave', 'circle', () => {
        (map.current as mapboxgl.Map).getCanvas().style.cursor = '';
      });
    });
  });

  // Меняет центр карты при выборе из списка
  async function getCenter(centerPoint: string) {
    const request = await fetch(getGeocoderUrl(centerPoint));
    const response = await request.json();

    const [cityLng, cityLat] =
      response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(' ')
        .map(Number);

    setCenterLng(cityLng);
    setCenterLat(cityLat);
  }

  // Возвращает массив с координатами пункта выдачи
  async function getCoordinates(searchAddress: string) {
    const request = await fetch(getGeocoderUrl(searchAddress));
    const response = await request.json();

    const [cityLng, cityLat]: number[] =
      response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(' ')
        .map(Number);

    return [cityLng, cityLat];
  }

  useEffect(() => {
    // Получает координаты всех пунктов выдачи по адресу и отрисовывает их на карте
    const renderPoints = (): void => {
      if (data) {
        data = data.data.filter((item: IPoint) => item.cityId);
        const promises: IGeoPoint[] = data.map(async (item: IPoint) => {
          const searchAddress = `${item.cityId.name} ${item.address}`;

          const [pointLng, pointLat] = await getCoordinates(searchAddress);
          const geoObject = getGeoJsonObject([pointLng, pointLat], item);

          return geoObject;
        });

        Promise.allSettled(promises).then((settledPromise) => {
          settledPromise.forEach((item) => {
            if (item.status === 'fulfilled') {
              points.push(item.value);
            }
          });

          // Add a circle layer
          (map.current as mapboxgl.Map).addSource(
            'points',
            getGeoJsonObjectList(points),
          );
          (map.current as mapboxgl.Map).addLayer(GEOPIN_STYLES);

          // Center the map on the coordinates of any clicked circle from the 'circle' layer.
          (map.current as mapboxgl.Map).on(
            'click',
            'circle',
            (e: mapboxgl.EventData) => {
              const coordinates = e.features[0].geometry.coordinates.slice();
              const { description, address } = e.features[0].properties;
              const point = JSON.parse(address) as IPoint;

              (map.current as mapboxgl.Map).flyTo({
                center: coordinates,
                zoom: 14,
              });

              dispatch(updatePoint(point));
              dispatch(updateCity(point.cityId.name));
              dispatch(updateAddress(point.address));

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map.current as mapboxgl.Map);
            },
          );
        });
      }
    };

    renderPoints();
  }, [data]);

  useEffect(() => {
    if (pointState.cityId.name) {
      getCenter(pointState.cityId.name);
    }
  }, [pointState.cityId.name]);

  useEffect(() => {
    if (pointState.address) {
      getCenter(`${pointState.cityId.name} ${pointState.address}`);
    }
  }, [pointState.address]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([centerLng, centerLat]);
    }
  }, [centerLat, centerLng]);

  return <div className={cl.map} id="map" ref={mapContainer} />;
};

export default Map;
