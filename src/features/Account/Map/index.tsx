/* eslint-disable */
import React, { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/types';
import useDrawerEnter from 'hooks/useDrawerEnter';
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

  useDrawerEnter(() => {
    new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12
    });
  });

  return (
    <div
      className="preview-map"
      onClick={() =>
        showDrawer({
          component: 'snapMap',
          animationIn: 'fadeIn',
          animationOut: 'fadeOut',
          animationInDuration: 0,
          animationOutDuration: 0,
          theme: 'stripped'
        })
      }
    >
      <div ref={mapRef}></div>
    </div>
  );
};

export default Map;
