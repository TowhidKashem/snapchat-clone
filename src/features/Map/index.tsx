import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_API_KEY } from 'config';
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

  // if (!('geolocation' in navigator)) {
  //   alert('get location not supported');
  //   // return;
  //   // locationBtn.style.display = 'none';
  // }

  const setMarker = (lat, lon, map) => {
    const marker = document.createElement('div');
    marker.className = styles.marker;
    marker.onclick = openVideo;
    new mapboxgl.Marker(marker).setLngLat([lon, lat]).addTo(map);
  };

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

  useEffect(() => {
    mapboxgl.accessToken = MAP_BOX_API_KEY;

    // // Weather
    // getWeather(40.761219, -73.92318);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lon = coords.longitude;

        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lon, lat],
          zoom: 14
        });

        // add markers to map
        var el = document.createElement('div');
        el.className = styles.selfMarker;

        new mapboxgl.Marker(el)
          .setLngLat([lon, lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<h3>Me</h3><p>Not Sharing Location</p>')
          )
          .addTo(map);

        // Show some dummy snaps nearby
        const snapCoordinates = [
          {
            lat: lat + 0.003,
            lon: lon - 0.005
          },
          {
            lat: lat + 0.007,
            lon: lon - 0.002
          },
          {
            lat: lat + 0.006,
            lon: lon - 0.003
          }
        ];

        snapCoordinates.forEach(({ lat, lon }) => setMarker(lat, lon, map));

        // Weather
        getWeather(lat, lon);
      },
      (err) => {
        console.log(err);
        alert("Couldn't fetch location, please enter manually!");
      },
      {
        timeout: 7000
      }
    );
  }, []);

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
