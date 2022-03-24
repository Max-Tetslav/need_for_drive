import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_API, DEFAULT_COORDINATES_DATA, GEOPIN_STYLES } from '@utils/constants/mapboxData';
import cl from './Map.module.scss';
import 'mapbox-gl/src/css/mapbox-gl.css';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();
  const [lng, setLng] = useState(48.37);
  const [lat, setLat] = useState(54.31);
  const [mapZoom, setMapZoom] = useState(12);

  mapboxgl.accessToken = MAPBOX_API as string;

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: mapZoom,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav);

    map.current.on('load', () => {
      (map.current as mapboxgl.Map).addSource('points', DEFAULT_COORDINATES_DATA);
      // Add a circle layer
      (map.current as mapboxgl.Map).addLayer(GEOPIN_STYLES);

      // Center the map on the coordinates of any clicked circle from the 'circle' layer.
      (map.current as mapboxgl.Map).on('click', 'circle', (e: mapboxgl.EventData) => {
        (map.current as mapboxgl.Map).flyTo({
          center: e.features[0].geometry.coordinates,
        });
      });

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

  return <div className={cl.map} id="map" ref={mapContainer} />;
};

export default Map;
