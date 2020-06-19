import { useEffect } from 'react';

const useGeo = (callback, delay = 0) => {
  useEffect(() => {
    const respond = (lat, lon) => setTimeout(() => callback(lat, lon), delay);

    // If the browser doesn't support geolocation or the call failed for some reason
    // send a dummy location for purposes of the demo (Times Sq, NYC)
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
          timeout: 7000,
          enableHighAccuracy: true
        }
      );
    } else {
      dummyResponse();
    }
  }, []);
};

export default useGeo;
