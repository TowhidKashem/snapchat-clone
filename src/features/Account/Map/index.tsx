import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ShowDrawer } from 'AppShell/types';
import { Geolocation, SetLatLon } from 'features/User/types';
import useGeo from 'hooks/useGeo';
import Loader from 'common/Loader';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
  geolocation: Geolocation;
  setLatLon: SetLatLon;
}

const apiKey = process.env.REACT_APP_MAP_BOX_API_KEY;
const hasApiKey = apiKey?.length ? true : false;
if (hasApiKey) mapboxgl.accessToken = apiKey;

const Map: React.FC<Props> = ({ showDrawer, geolocation, setLatLon }) => {
  const mapRef = useRef<any>();
  const [loading, setLoading] = useState(true);

  // If the API call to `https://geolocation-db.com/json/` fired earlier on in the app's lifecycle was successful
  // then we use that for the lat/lon, otherwise we ask the user for their location via the browser's `geolocation` API
  // the reason why we don't use that as the first choice is because it's often very slow!
  const { latitude, longitude } = geolocation;
  const exitGeoPrompt = !hasApiKey || (hasApiKey && latitude && longitude);

  const loadMap = (lat, lon) =>
    new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 13
    }).on('load', () => setLoading(false));

  useEffect(() => {
    if (hasApiKey && latitude && longitude) loadMap(latitude, longitude);
  }, []);

  useGeo(
    (lat, lon) => {
      loadMap(lat, lon);
      setLatLon(lat, lon);
    },
    300,
    //@ts-ignore
    exitGeoPrompt
  );

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
