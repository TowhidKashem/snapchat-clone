import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import mapboxgl, { Map } from 'mapbox-gl';
import { onAnimationComplete } from 'utils';
import { getSnaps, getWeather } from './store';
import { showDrawer } from 'AppShell/store';
import { addSnap } from 'features/Snap/store';
import { Snap } from 'features/Snap/types';
import Loader from 'common/Loader';
import Header from './Header';
import './index.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY as string;

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
    dispatch(getSnaps({ lat: latitude, lon: longitude, city, state }));
    dispatch(getWeather({ lat: latitude, lon: longitude }));
    if (mapElem.current)
      setMap(
        new mapboxgl.Map({
          container: mapElem.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitude, latitude],
          zoom: 13
        }).on('load', () => setLoading(false))
      );
  }, [dispatch, latitude, longitude, city, state]);

  // Add self marker on map
  useEffect(() => {
    if (map) {
      const addSelfMarker = () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('self-marker');

        new mapboxgl.Marker(tooltip).setLngLat([longitude, latitude]).addTo(map);

        setTimeout(() => {
          tooltip.classList.add('zoomed-in');

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
      const { lat, lon } = snap;

      const marker = document.createElement('a');
      marker.classList.add('marker');
      marker.setAttribute('data-test', 'marker');
      marker.addEventListener('click', (e: any) => {
        e.preventDefault();

        // Show pulse animation
        e.target.classList.add('active');

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
        onAnimationComplete(() => e.target.classList.remove('active'), 1000);
      });

      if (lat && lon) {
        new mapboxgl.Marker(marker).setLngLat([lon, lat]).addTo(map as Map);
      }
    };

    snaps.map((snap: Snap) => addSnapToMap(snap));
  }, [snaps, map, dispatch]);

  return (
    <div className="snap-map">
      <div className="inner">
        {loading && <Loader />}
        <Header />
        <div ref={mapElem} className="content"></div>
      </div>
    </div>
  );
};

export default SnapMap;
