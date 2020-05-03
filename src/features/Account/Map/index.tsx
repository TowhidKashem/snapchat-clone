import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_API_KEY } from 'config';
import styles from './index.module.scss';

interface Props {
  // lat: number;
  // lng: number;
}

const Map: React.SFC<Props> = () => {
  const lat = 40.76122;
  const lng = -73.92318;

  mapboxgl.accessToken = MAP_BOX_API_KEY;

  const mapRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12
      });
    }, 500);
  }, []);

  return (
    <div className={styles.map}>
      <div ref={mapRef}></div>
    </div>
  );
};

export default Map;
