import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/types';
import { SetLatLon } from 'features/User/types';
import Loader from 'common/Loader';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  getGeoLocation: () => any;
  setLatLon: SetLatLon;
}

const apiKey = process.env.REACT_APP_MAP_BOX_API_KEY;
const hasApiKey = apiKey?.length ? true : false;
if (hasApiKey) mapboxgl.accessToken = apiKey;

const Map: React.FC<Props> = ({ showDrawer, getGeoLocation, setLatLon }) => {
  const mapRef = useRef<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasApiKey) return;

    (async () => {
      // Attempt to get the user's geo location via this endpoint `https://geolocation-db.com/json/` (IP based)
      // if it fails ask the user for their location via the `navigator.geolocation` API (much slower)
      const [error, response] = await getGeoLocation();

      if (!error) {
        loadMap(response.latitude, response.longitude);
      } else {
        const respond = (lat, lon) => {
          loadMap(lat, lon);
          setLatLon(lat, lon);
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
  }, []);

  const loadMap = (lat, lon) => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 13
    }).on('load', () => {
      setLoading(false);
      // Add self marker
      const tooltip = document.createElement('div');
      tooltip.className = 'self-marker';
      new mapboxgl.Marker(tooltip).setLngLat([lon, lat]).addTo(map);
    });
  };

  return (
    <div
      className="preview-map"
      onClick={() =>
        hasApiKey &&
        showDrawer({
          component: 'snapMap',
          animationIn: 'fadeIn',
          animationOut: 'fadeOut',
          animationInDuration: 0,
          animationOutDuration: 0,
          theme: 'stripped'
        })
      }
    >
      {!hasApiKey ? (
        <div className="api-key-msg">
          <p>
            🌎 Get a free mapboxgl{' '}
            <a
              href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/"
              target="_blank"
            >
              API key here
            </a>
            , then add it to the <code>.env</code> file and run <code>npm start</code>{' '}
            again to view the snap map features!
          </p>
        </div>
      ) : loading ? (
        <Loader />
      ) : null}
      <div className="map" ref={mapRef}></div>
    </div>
  );
};

export default Map;
