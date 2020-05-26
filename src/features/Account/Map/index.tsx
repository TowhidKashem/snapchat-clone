/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/types';
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
    // 300ms is the `animationInDuration` of the `account` drawer
    // delaying the init of the map until after the drawer fully opens prevents animation choppiness
    setTimeout(() => {
      new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12
      });
    }, 300);
  }, []);

  return (
    <div
      className="preview-map"
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
