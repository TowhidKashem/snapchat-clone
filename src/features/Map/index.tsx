import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_API_KEY } from 'config';
import useGeo from 'hooks/useGeo';
import Header from './Header';
import styles from './index.module.scss';

interface Props {
  user: any;
  getWeather: any;
  showDrawer: any;
  showVideo: any;
}

const Map: React.SFC<Props> = ({ showDrawer, showVideo, getWeather, user }) => {
  const mapRef = useRef<any>();

  const openVideo = () => {
    showVideo({
      videoId: 'UBX8MWYel3s',
      location: 'New York City, New York',
      time: 'Sat'
    });
    showDrawer({
      component: 'video',
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      theme: 'dark'
    });
  };

  const setMarker = (lat, lon, map) => {
    const marker = document.createElement('div');
    marker.className = styles.marker;
    marker.onclick = (e: any) => {
      e.target.classList.add(styles.active);
      setTimeout(openVideo, 900);
      setTimeout(() => e.target.classList.remove(styles.active), 1000);
    };
    new mapboxgl.Marker(marker).setLngLat([lon, lat]).addTo(map);
  };

  // // Weather
  // getWeather(40.761219, -73.92318);

  useGeo((lat, lon) => {
    mapboxgl.accessToken = MAP_BOX_API_KEY;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 14
    });

    // setTimeout(() => {
    //   map.flyTo({
    //     center: [lon, lat],
    //     essential: true
    //   });
    // }, 2000);

    // Add markers to map
    const el = document.createElement('div');
    el.className = styles.selfMarker;

    new mapboxgl.Marker(el)
      .setLngLat([lon, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<h3>Me</h3><p>Not Sharing Location</p>'
        )
      )
      .addTo(map);

    // Show some dummy snaps nearby
    const snapCoordinates = [
      {
        lat: lat - 0.005,
        lon: lon + 0.005
      },
      {
        lat: lat - 0.003,
        lon: lon - 0.005
      },
      {
        lat: lat - 0.01,
        lon: lon - 0.002
      },
      {
        lat: lat + 0.007,
        lon: lon + 0.005
      },
      {
        lat: lat + 0.003,
        lon: lon - 0.0
      },
      {
        lat: lat + 0.007,
        lon: lon - 0.007
      }
    ];

    snapCoordinates.forEach(({ lat, lon }) => setMarker(lat, lon, map));

    // Weather
    getWeather(lat, lon);
  });

  return (
    <div className={styles.map}>
      <div className={styles.inner}>
        <Header />
        <div ref={mapRef} className={styles.content}></div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(actions.showDrawer(drawer)),
  showVideo: (video) => dispatch(actions.showVideo(video)),
  getWeather: (lat, lon) => dispatch(actions.getWeather(lat, lon))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
