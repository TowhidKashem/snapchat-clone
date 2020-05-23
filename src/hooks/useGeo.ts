/* eslint-disable */
import React, { useEffect } from 'react';

const useGeo = (callback) => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          callback(coords.latitude, coords.longitude);
        },
        (err) => {
          console.log(err);
          alert("Couldn't fetch location, please enter manually!");
        },
        {
          timeout: 7000
        }
      );
    } else {
      alert('get location not supported');
      return;
    }
  }, []);
};

export default useGeo;
