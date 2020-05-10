//@ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import useVideo from 'hooks/useVideo';
import { loadScripts } from 'utils';
import styles from './index.module.scss';

type Filter = 'dog' | 'bees' | 'halloween' | 'deform' | null;

declare global {
  interface Window {
    deform: any;
  }
}

interface Props {}

const dependencies = {
  dog: [
    './jeelizFaceFilter/filters/dog/dependencies.min.js',
    './jeelizFaceFilter/filters/dog/index.js'
  ],
  bees: [
    './jeelizFaceFilter/filters/bees/dependencies.min.js',
    './jeelizFaceFilter/filters/bees/index.js'
  ],
  halloween: ['./jeelizFaceFilter/filters/halloween/index.js'],
  deform: ['./jeelizFaceFilter/filters/deform/index.js']
};

const Camera: React.FC<Props> = () => {
  const videoPlayer = useRef<any>();

  const [filter, setFilter] = useState<Filter>(null);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);

  // useVideo((stream) => {
  //   // @ts-ignore
  //   videoPlayer.current.srcObject = stream;
  // });

  useEffect(() => {
    if (!filter) return;
    if (loadedFilters.includes(filter)) {
      window.Filters[filter].init();
    } else {
      loadScripts(dependencies[filter], () => {
        window.Filters[filter].init();
        setLoadedFilters([...loadedFilters, filter]);
      });
    }
  }, [filter]);

  const switchFilter = async (filter: Filter) => {
    if (loadedFilters.length) {
      try {
        await JEEFACEFILTERAPI.destroy();
        setFilter(filter);
      } catch (err) {}
    } else {
      setFilter(filter);
    }
  };

  return (
    <main className={`static ${styles.camera}`}>
      <div
        style={{
          border: '5px solid red',
          padding: '10px',
          zIndex: 100000,
          position: 'relative',
          background: '#fff',
          fontWeight: 'bold'
        }}
      >
        <button type="button" onClick={() => switchFilter('deform')}>
          Deform
        </button>
        <button type="button" onClick={() => switchFilter('bees')}>
          Bees
        </button>
        <button type="button" onClick={() => switchFilter('dog')}>
          Dog
        </button>
        <button type="button" onClick={() => switchFilter('halloween')}>
          Halloween
        </button>
      </div>
    </main>
  );
};

export default Camera;
