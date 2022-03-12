import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import mapboxgl, { Map } from 'mapbox-gl';
import { onAnimationComplete } from 'utils';
import { getSnaps, getWeather } from './SnapMapStore';
import { showDrawer } from 'AppShell/AppShellStore';
import { addSnap, Snap } from 'features/Snap/SnapStore';
import Loader from 'components/Loader/Loader';
import Header from './Header/Header';
import './SnapMap.scss';

const apiKey = process.env.REACT_APP_MAP_BOX_API_KEY;
if (apiKey) {
  mapboxgl.accessToken = apiKey;
}

const SnapMap: React.FC = () => {
  const dispatch = useDispatch();
  const {
    user: { geolocation },
    snapMap: { snaps }
  } = useSelector(({ user, snapMap }: RootStateOrAny) => ({ user, snapMap }));

  const mapElem = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<Map | null>(null);

  const { latitude, longitude, city, state } = geolocation;

  useEffect(() => {
    dispatch(
      getSnaps({
        lat: latitude,
        lon: longitude,
        city,
        state
      })
    );
    dispatch(
      getWeather({
        lat: latitude,
        lon: longitude
      })
    );
    loadMap();
  }, []);

  // Add self marker on map after map has loaded
  useEffect(() => {
    if (map) {
      addSelfMarkerToMap();
      // Zoom in effect on load
      setTimeout(() => map.flyTo({ zoom: 14 }), 2000);
    }
  }, [map]);

  // Add snaps on map after snaps have loaded
  useEffect(() => {
    snaps.forEach((snap: Snap) => addSnapToMap(snap));
  }, [snaps]);

  const loadMap = () => {
    if (mapElem.current) {
      const map = new mapboxgl.Map({
        container: mapElem.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 13
      }).on('load', () => setLoading(false));

      setMap(map);
    }
  };

  const addSelfMarkerToMap = () => {
    if (!map) return;

    const tooltip = document.createElement('div');
    tooltip.classList.add('self-marker');

    const marker = new mapboxgl.Marker(tooltip).setLngLat([longitude, latitude]);

    marker.addTo(map);

    setTimeout(() => {
      tooltip.classList.add('zoomed-in');

      const popup = new mapboxgl.Popup({
        closeOnClick: false
      })
        .setLngLat([longitude, latitude])
        .setHTML(
          `<header>Me</header>
            <p>Not Sharing Location</p>`
        );

      popup.addTo(map);
    }, 2300);
  };

  const addSnapToMap = (snap: Snap) => {
    const { lat, lon } = snap;

    const marker = document.createElement('a');
    marker.classList.add('marker');
    marker.setAttribute('data-test', 'marker');
    marker.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();

      const elem = e.currentTarget as HTMLButtonElement;

      // Show pulse animation
      elem.classList.add('active');

      // Delay opening the drawer so we can see the pulse
      onAnimationComplete(() => {
        dispatch(addSnap(snap));
        dispatch(
          showDrawer({
            component: 'snap',
            animationIn: 'zoomIn',
            animationOut: 'zoomOut',
            theme: 'dark'
          })
        );
      }, 900);

      // Remove pulse
      onAnimationComplete(() => elem.classList.remove('active'), 1000);
    });

    if (lat && lon) {
      const snap = new mapboxgl.Marker(marker).setLngLat([lon, lat]);
      snap.addTo(map as Map);
    }
  };

  return (
    <div className="snap-map">
      <div className="inner">
        {loading && <Loader />}
        <Header />
        <div ref={mapElem} className="content" />
      </div>
    </div>
  );
};

export default SnapMap;
