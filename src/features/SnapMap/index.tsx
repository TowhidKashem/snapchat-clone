import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { Snap, OpenSnap } from 'features/Snap/types';
import { GetSnaps } from './types';

import { showDrawer, hideDrawer } from 'AppShell/duck';
import { openSnap } from 'features/Snap/duck';
import { getSnaps } from './duck';

import useGeo from 'hooks/useGeo';
// import Header from './Header';
import './index.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

interface Props {
  snaps: Snap[];
  getSnaps: GetSnaps;
  openSnap: OpenSnap;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
}

const SnapMap: React.FC<Props> = ({
  snaps,
  getSnaps,
  openSnap,
  showDrawer,
  hideDrawer
}) => {
  const [map, setMap] = useState(null);
  const [geo, setGeo] = useState<{ lat: number; lon: number }>();
  const mapElem = useRef<any>();

  // Add self marker on map
  useEffect(() => {
    if (map) addSelfMarker();
  }, [map]);

  // Add snaps on map after they've been retrieved from the API
  useEffect(() => {
    if (map) snaps.map((snap) => addSnapToMap(snap));
  }, [snaps]);

  const addSelfMarker = () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'self-marker';
    new mapboxgl.Marker(tooltip)
      .setLngLat([geo?.lon, geo?.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<h3>Me</h3><p>Not Sharing Location</p>'
        )
      )
      .addTo(map);
  };

  const addSnapToMap = (snap: Snap) => {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.onclick = (e: any) => {
      e.target.classList.add('active');
      // Delay opening the drawer so we can see the pulse animation
      setTimeout(() => {
        openSnap(snap);
        showDrawer({
          component: 'snap',
          animationIn: 'zoomIn',
          animationOut: 'zoomOut',
          theme: 'dark'
        });
      }, 900);
      // Remove pulse animation
      setTimeout(() => e.target.classList.remove('active'), 1000);
    };
    new mapboxgl.Marker(marker).setLngLat([snap.lon, snap.lat]).addTo(map);
  };

  useGeo((lat, lon) => {
    getSnaps(lat, lon);
    setGeo({ lat, lon });
    setMap(
      new mapboxgl.Map({
        container: mapElem.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 14
      })
    );
    // setTimeout(() => {
    //   map.flyTo({
    //     center: [lon, lat],
    //     essential: true
    //   });
    // }, 2000);
  });

  return (
    <div className="snap-map">
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
  getSnaps: (lat, lon) => dispatch(getSnaps(lat, lon)),
  openSnap: (snap) => dispatch(openSnap(snap)),
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapMap);
