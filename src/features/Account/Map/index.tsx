import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_API_KEY } from 'config';
import styles from './index.module.scss';

interface Props {
  // showModal: (component: string) => void;
  showDrawer: any;
}

const Map: React.SFC<Props> = ({ showDrawer }) => {
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
    <div className={styles.map} onClick={() => showDrawer('map', 'fadeIn', 'fadeOut')}>
      <div ref={mapRef}></div>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component, animationIn, animationOut) =>
    dispatch(actions.showDrawer(component, animationIn, animationOut))
  // showModal: (component) => dispatch(actions.showModal(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
