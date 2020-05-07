// @ts-nocheck
import React from 'react';
import styles from './index.module.scss';

const Camera = () => {
  const { useEffect, useRef } = React;

  const videoPlayer = useRef<HTMLVideoElement>();

  // Recursive function to load scripts in order then perform callback
  const loadScripts = (scripts, callback) => {
    const loadScript = (index) => {
      const script = document.createElement('script');
      script.src = scripts[index];
      script.onload = () => {
        if (index + 1 !== scripts.length) loadScript(index + 1);
        else callback();
      };
      document.body.appendChild(script);
    };
    loadScript(0);
  };

  useEffect(() => {
    loadScripts(
      [
        // both
        './jeelizFaceFilter/dist/jeelizFaceFilter.js',
        './jeelizFaceFilter/libs/threejs/v97/three.js',
        './jeelizFaceFilter/helpers/JeelizResizer.js',
        './jeelizFaceFilter/helpers/JeelizThreejsHelper.js',

        // dog + miel pops
        './jeelizFaceFilter/libs/tween/v16_3_5/Tween.min.js',

        // dog face only
        './jeelizFaceFilter/libs/threejs/customMaterials/FlexMaterial/ThreeFlexMaterial.js',
        './glfx.js',

        // dog and miel pops
        './jeelizFaceFilter/helpers/addDragEventListener.js',

        // demos
        // './jeelizFaceFilter/demos/threejs/halloween_spider/demo.js'
        // './jeelizFaceFilter/demos/threejs/dog_face/demo.js'
        // './jeelizFaceFilter/demos/threejs/faceDeform/demo.js'
        './jeelizFaceFilter/demos/threejs/miel_pops/demo.js'
      ],
      () => {
        // main();
      }
    );
  }, []);

  const intializeMedia = async () => {
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
      videoPlayer.current.srcObject = stream;
    } catch (err) {
      alert(err);
    }
  };

  // intializeMedia();

  return (
    <main className={`static ${styles.camera}`}>
      {/* <video id="player" ref={videoPlayer} autoPlay></video> */}
    </main>
  );
};

export default Camera;
