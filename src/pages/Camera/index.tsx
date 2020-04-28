// @ts-nocheck
import React from 'react';
import styles from './index.module.scss';

const Camera = () => {
  const { useEffect, useRef } = React;

  const videoPlayer = useRef<HTMLVideoElement>();

  useEffect(() => {
    intializeMedia();
  }, []);

  const intializeMedia = async () => {
    // Polyfill for older browsers/devices that don't support `getUserMedia()`
    // May not be nessecary since the latest versions of Android Chrome and IOS Safari both do
    if (!('mediaDevices' in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = constraints => {
        const getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(
            new Error('getUserMedia() is not implemented!')
          );
        }
        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    // Ask for permission then display stream to canvas
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
        // audio: true
      });
      videoPlayer.current.srcObject = stream;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <main className={styles.camera}>
      <video id="player" ref={videoPlayer} autoPlay></video>
    </main>
  );
};

export default Camera;
