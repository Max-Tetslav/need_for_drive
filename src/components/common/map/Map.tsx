import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { DEFAULT_ZOOM, DEFAULT_LAT, DEFAULT_LNG } from '@utils/constants/locationData';
import { MAPBOX_API, MAPBOX_STYLES, GEOPIN_STYLES } from '@utils/constants/mapboxData';
import needForDriveApi from '@services/location';
import { IPoint } from '@models/orderPageData';
import { IGeoPoint } from '@models/mapData';
import { getGeocoderUrl, getGeoJsonObject, getGeoJsonObjectList } from '@utils/helpers/locationHelpers';
import 'mapbox-gl/src/css/mapbox-gl.css';
import cl from './Map.module.scss';

interface IMapProps {
  city: string;
  point: string;
}

const Map: React.FC<IMapProps> = ({ city = '', point = '' }) => {
  mapboxgl.accessToken = MAPBOX_API as string;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [mapZoom] = useState(DEFAULT_ZOOM);

  let { data } = needForDriveApi.useGetPointsListQuery('');
  const points = [] as IGeoPoint[];

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: MAPBOX_STYLES,
      center: [lng, lat],
      zoom: mapZoom,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav);

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

    const [cityLng, cityLat] = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number);

    setLng(cityLng);
    setLat(cityLat);
  }

  // Возвращает обект с координатами всех пунктов выдачи
  async function getCoordinatesFormat(searchAddress: string) {
    const request = await fetch(getGeocoderUrl(searchAddress));
    const response = await request.json();

    const [cityLng, cityLat]: number[] = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
      .split(' ')
      .map(Number);

    return getGeoJsonObject([cityLng, cityLat]);
  }

  useEffect(() => {
    // Получает координаты всех пунктов выдачи по адресу и отрисовывает их на карте
    const renderPoints = (): void => {
      if (data) {
        data = data.data.filter((item: IPoint) => item.cityId);
        const promises: IGeoPoint[] = data.map(async (item: IPoint) => {
          const searchAddress = `${item.cityId.name} ${item.address}`;
          const promisePoint = await getCoordinatesFormat(searchAddress);

          return promisePoint;
        });

        Promise.allSettled(promises).then((settledPromise) => {
          settledPromise.forEach((item) => {
            if (item.status === 'fulfilled') {
              points.push(item.value);
            }
          });

          // Add a circle layer
          (map.current as mapboxgl.Map).addSource('points', getGeoJsonObjectList(points));
          (map.current as mapboxgl.Map).addLayer(GEOPIN_STYLES);

          // Center the map on the coordinates of any clicked circle from the 'circle' layer.
          (map.current as mapboxgl.Map).on('click', 'circle', (e: mapboxgl.EventData) => {
            (map.current as mapboxgl.Map).flyTo({
              center: e.features[0].geometry.coordinates,
              zoom: 14,
            });
          });
        });
      }
    };

    renderPoints();
  }, [data]);

  useEffect(() => {
    if (city) {
      getCenter(city);
    }
  }, [city]);

  useEffect(() => {
    if (point) {
      getCenter(`${city} ${point}`);
    }
  }, [point]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
    }
  }, [lat, lng]);

  return <div className={cl.map} id="map" ref={mapContainer} />;
};

export default Map;
