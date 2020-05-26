import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { showVideo } from 'features/Video/duck';
import { getWeather } from './duck';
import { dummySnaps } from './data';
import mapboxgl from 'mapbox-gl';
import useGeo from 'hooks/useGeo';
import Header from './Header';
import './index.scss';

interface Props {
  weather: any;
  getWeather: any;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  showVideo: any;
}

const MAP_BOX_API_KEY = process.env.REACT_APP_MAP_BOX_API_KEY;

const Map: React.FC<Props> = ({
  showDrawer,
  hideDrawer,
  showVideo,
  getWeather,
  weather
}) => {
  const mapRef = useRef<any>();

  const openVideo = ({ location, time, file }) => {
    showVideo({ file, location, time });
    showDrawer({
      component: 'video',
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      theme: 'dark'
    });
  };

  const setMarker = (lat, lon, media, map) => {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.onclick = (e: any) => {
      e.target.classList.add('active');
      // The setTimeout's below are to allow time to display the pulsing effect
      setTimeout(() => openVideo(media), 900);
      setTimeout(() => e.target.classList.remove('active'), 1000);
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
    el.className = 'self-marker';

    new mapboxgl.Marker(el)
      .setLngLat([lon, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<h3>Me</h3><p>Not Sharing Location</p>'
        )
      )
      .addTo(map);

    // Show some dummy snaps nearby
    dummySnaps(lat, lon).forEach(({ lat, lon, media }) =>
      setMarker(lat, lon, media, map)
    );

    // // Weather
    // getWeather(lat, lon);
  });

  return (
    <div className="map">
      <div className="inner">
        <Header weather={weather} hideDrawer={hideDrawer} />
        <div ref={mapRef} className="content"></div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ weather }) => ({ weather });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  showVideo: (video) => dispatch(showVideo(video)),
  getWeather: (lat, lon) => dispatch(getWeather(lat, lon))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
