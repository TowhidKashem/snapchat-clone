/* eslint-disable */
import React, { useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/types';
import useGeo from 'hooks/useGeo';
import Loader from 'common/Loader';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

const Map: React.FC<Props> = ({ showDrawer }) => {
  const mapRef = useRef<any>();
  const [loading, setLoading] = useState(true);

  useGeo((lat, lon) => {
    new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 12
    }).on('load', () => setLoading(false));
  }, 300);

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
      {loading && <Loader />}
      <div className="map" ref={mapRef}></div>
    </div>
  );
};

export default Map;
