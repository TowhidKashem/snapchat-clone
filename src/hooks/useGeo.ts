import { useEffect } from 'react';

const useGeo = (callback, delay = 0) => {
  useEffect(() => {
    const respond = (lat, lon) => setTimeout(() => callback(lat, lon), delay);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          respond(coords.latitude, coords.longitude);
        },
        (err) => {
          // If we failed to get the geo just send dummy location (Times Sq, NY) for purposes of the demo
          respond(40.75491, -73.994102);
        },
        {
          maximumAge: Infinity,
          timeout: 7000,
          enableHighAccuracy: true
        }
      );
    }
    // Send dummy location if the browser doesn't support geolocation API
    else {
      respond(40.75491, -73.994102);
    }
  }, []);
};

export default useGeo;
