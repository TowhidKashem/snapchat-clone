import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer, HideDrawer } from 'AppShell/types';
import { Geolocation } from 'features/User/types';
import { Snap, OpenSnap } from 'features/Snap/types';
import { GetSnaps, GetWeather, Weather } from './types';
import { showDrawer, hideDrawer } from 'AppShell/duck';
import { openSnap } from 'features/Snap/duck';
import { getSnaps, getWeather } from './duck';
import { onAnimationComplete } from 'utils/animation';
import Header from './Header';
import Loader from 'common/Loader';
import './index.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY as string;

interface Props {
  snaps: Snap[];
  weather: Weather;
  getSnaps: GetSnaps;
  openSnap: OpenSnap;
  getWeather: GetWeather;
  showDrawer: ShowDrawer;
  hideDrawer: HideDrawer;
  geolocation: Geolocation;
}

const SnapMap: React.FC<Props> = ({
  snaps,
  weather,
  getSnaps,
  openSnap,
  getWeather,
  showDrawer,
  hideDrawer,
  geolocation
}) => {
  const { latitude, longitude } = geolocation;

  const mapElem = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    getSnaps(latitude, longitude);
    getWeather(latitude, longitude);
    setMap(
      new mapboxgl.Map({
        container: mapElem.current as HTMLDivElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 13
      }).on('load', () => setLoading(false))
    );
  }, [getSnaps, getWeather, latitude, longitude]);

  // Add self marker on map
  useEffect(() => {
    if (map) {
      const addSelfMarker = () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'self-marker';

        new mapboxgl.Marker(tooltip).setLngLat([longitude, latitude]).addTo(map);

        setTimeout(() => {
          tooltip.classList.add('zoomedIn');

          new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([longitude, latitude])
            .setHTML(
              `<header>Me</header>
              <p>Not Sharing Location</p>`
            )
            .addTo(map);
        }, 2300);
      };

      addSelfMarker();

      // Zoom in effect on load
      setTimeout(() => map.flyTo({ zoom: 14 }), 2000);
    }
  }, [map, latitude, longitude]);

  // Add snaps on map after they've loaded
  useEffect(() => {
    const addSnapToMap = (snap: Snap) => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      marker.onclick = function (e: any) {
        // Show pulse animation
        e.target.classList.add('active');
        // Delay opening the drawer so we can see the pulse
        onAnimationComplete(() => {
          openSnap({
            ...snap,
            lastLoaded: Date.now()
          });
          showDrawer({
            component: 'snap',
            animationIn: 'zoomIn',
            animationOut: 'zoomOut',
            theme: 'dark'
          });
        }, 900);
        // Remove pulse
        onAnimationComplete(() => e.target.classList.remove('active'), 1000);
      };
      new mapboxgl.Marker(marker)
        .setLngLat([snap.lon as number, snap.lat as number])
        .addTo(map as mapboxgl.Map);
    };

    snaps.map((snap) => addSnapToMap(snap));
  }, [snaps, map, openSnap, showDrawer]);

  return (
    <div className="snap-map">
      <div className="inner">
        {loading && <Loader />}
        <Header weather={weather} city={geolocation.city} hideDrawer={hideDrawer} />
        <div ref={mapElem} className="content"></div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ snapMap, user }) => ({
  snaps: snapMap.snaps,
  weather: snapMap.weather,
  geolocation: user.geolocation
});

const mapDispatchToProps = (dispatch) => ({
  getSnaps: (lat, lon) => dispatch(getSnaps(lat, lon)),
  openSnap: (snap) => dispatch(openSnap(snap)),
  getWeather: (lat, lon) => dispatch(getWeather(lat, lon)),
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapMap);
