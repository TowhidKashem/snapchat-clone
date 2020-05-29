import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { Snap, OpenSnaps } from 'features/Snap/types';
import { openSnaps } from 'features/Snap/duck';
import {
  // getWeather,
  getSnaps
} from './duck';
import mapboxgl from 'mapbox-gl';
import useGeo from 'hooks/useGeo';
// import Header from './Header';
import './index.scss';

interface Props {
  // weather: any;
  // getWeather: any;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  openSnaps: OpenSnaps;

  snaps: any;
  getSnaps: any;
}

const MAP_BOX_API_KEY = process.env.REACT_APP_MAP_BOX_API_KEY;

const SnapMap: React.FC<Props> = ({
  showDrawer,
  hideDrawer,
  openSnaps,

  snaps,
  getSnaps
  // getWeather,
  // weather
}) => {
  const [map, setMap] = useState<any>();
  const mapElem = useRef<any>();

  const setMarker = ({ lat, lon, snaps }, map) => {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.onclick = (e: any) => {
      e.target.classList.add('active');
      // The setTimeout's below are to allow time to display the pulsing effect
      setTimeout(() => {
        openSnaps(snaps);
        showDrawer({
          component: 'media',
          animationIn: 'zoomIn',
          animationOut: 'zoomOut',
          theme: 'dark'
        });
      }, 900);
      setTimeout(() => e.target.classList.remove('active'), 1000);
    };
    new mapboxgl.Marker(marker).setLngLat([lon, lat]).addTo(map);
  };

  // Show some dummy snaps nearby
  if (map) snaps.map((snap) => setMarker(snap, map));

  useEffect(() => {
    getSnaps(40.761219, -73.92318);
  }, []);

  useGeo((lat, lon) => {
    // getSnaps(lat, lon);

    mapboxgl.accessToken = MAP_BOX_API_KEY;

    const localMap = new mapboxgl.Map({
      container: mapElem.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 14
    });

    setMap(localMap);

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
      .addTo(localMap);

    // Weather
    // getWeather(lat, lon);
    // getWeather(40.761219, -73.92318);
  });

  return (
    <div className="map">
      <div className="inner">
        {/* <Header weather={weather} hideDrawer={hideDrawer} /> */}
        <div ref={mapElem} className="content"></div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ snapMap }) => ({
  snaps: snapMap.snaps
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component)),
  openSnaps: (snaps) => dispatch(openSnaps(snaps)),
  getSnaps: (lat, lon) => dispatch(getSnaps(lat, lon))
  // getWeather: (lat, lon) => dispatch(getWeather(lat, lon))
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapMap);
