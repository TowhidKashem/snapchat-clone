// @ts-nocheck
import React, { useEffect } from 'react';

const useCamera = (callback) => {
  useEffect(() => {
    (async function () {
      // Polyfill for older browsers/devices that don't support `getUserMedia()`
      // May not be nessecary since the latest versions of Android Chrome and IOS Safari both do
      if (!('mediaDevices' in navigator)) {
        navigator.mediaDevices = {};
      }

      if (!('getUserMedia' in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
          const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia() is not implemented!'));
          }
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      // Ask for permission then display stream to canvas
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user'
            // width: { ideal: 414 },
            // height: { ideal: 736 }
          }
          // audio: true
        });
        callback(stream);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);
};

export default useCamera;
