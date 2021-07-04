import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { showDrawer } from 'AppShell/store';
import { getGeoLocation, setLatLon } from 'features/User/store';
import Loader from 'common/Loader';
import './index.scss';

const apiKey = process.env.REACT_APP_MAP_BOX_API_KEY as string;
const hasApiKey = apiKey?.length ? true : false;
if (hasApiKey) mapboxgl.accessToken = apiKey;

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const mapElem = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasApiKey) return;

    (async () => {
      // Attempt to get the user's geo location via this endpoint `https://geolocation-db.com/json/` (IP based)
      // if it fails ask the user for their location via the `navigator.geolocation` API (much slower)
      const response: any = await dispatch(getGeoLocation());

      if (response.payload) {
        const { latitude, longitude } = response.payload;
        loadMap(latitude, longitude);
      } else {
        const respond = (lat: number, lon: number) => {
          loadMap(lat, lon);

          dispatch(
            setLatLon({
              latitude: lat,
              longitude: lon
            })
          );
        };

        // If the browser doesn't support geolocation or the call failed
        // set a dummy location for purposes of the demo (Times Sq, NYC)
        const dummyResponse = () => respond(40.75491, -73.994102);

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              respond(coords.latitude, coords.longitude);
            },
            (err) => {
              dummyResponse();
            },
            {
              maximumAge: Infinity,
              timeout: 5000,
              enableHighAccuracy: true
            }
          );
        } else {
          dummyResponse();
        }
      }
    })();
  }, [dispatch]);

  const loadMap = (lat: number, lon: number) => {
    if (!mapElem.current) return;
    const map = new mapboxgl.Map({
      container: mapElem.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 13,
      interactive: false
    }).on('load', () => {
      setLoading(false);
      // Add self marker
      const tooltip = document.createElement('div');
      tooltip.classList.add('self-marker');
      new mapboxgl.Marker(tooltip).setLngLat([lon, lat]).addTo(map);
    });
  };

  return (
    <div
      className="preview-map"
      data-test="preview-map"
      onClick={() =>
        hasApiKey &&
        dispatch(
          showDrawer({
            component: 'snapMap',
            animationIn: 'fadeIn',
            animationOut: 'fadeOut',
            animationInDuration: 0,
            animationOutDuration: 0,
            theme: 'stripped'
          })
        )
      }
    >
      {!hasApiKey ? (
        <div className="api-key-msg">
          <p>
            <span role="img" aria-label="earth emoji">
              🌎
            </span>{' '}
            Get a free mapboxgl{' '}
            <a
              href="https://docs.mapbox.com/help/glossary/access-token/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API key here
            </a>
            , then rename the <code>.env.sample</code> file at the root of the project to
            just <code>.env</code> and place the key inside, finally run
            <code>npm start</code> again to view the snap map features!
          </p>
        </div>
      ) : loading ? (
        <Loader />
      ) : null}

      {hasApiKey && <div className="map" ref={mapElem}></div>}
    </div>
  );
};

export default Map;
