/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/Drawer/types';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const MAP_BOX_API_KEY = process.env.REACT_APP_MAP_BOX_API_KEY;

const Map: React.FC<Props> = ({ showDrawer }) => {
  const lat = 40.76122;
  const lng = -73.92318;

  mapboxgl.accessToken = MAP_BOX_API_KEY;

  const mapRef = useRef<any>();

  useEffect(() => {
    new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12
    });
  }, []);

  return (
    <div
      className="map"
      onClick={() =>
        showDrawer({
          component: 'map',
          animationIn: 'fadeIn',
          animationOut: 'fadeOut',
          animationInDuration: 0,
          animationOutDuration: 0
        })
      }
    >
      <div ref={mapRef}></div>
    </div>
  );
};

export default Map;
