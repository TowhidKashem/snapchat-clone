//@ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import Button from 'common/Button';
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

const Camera: React.FC<Props> = () => {
  const videoPlayer = useRef<any>();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(null);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);

  // useVideo((stream) => {
  //   // @ts-ignore
  //   videoPlayer.current.srcObject = stream;
  // });

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
      <section className={styles.controls}>
        <Animated
          animationIn="slideInRight"
          animationOut="slideInLeft"
          animationInDuration={300}
          animationOutDuration={300}
          isVisible={showFilters}
          animateOnMount={false}
        >
          <div className={styles.filters}>
            <Button icon="faWater" onclick={() => switchFilter('deform')} />
            <Button icon="faSpider" onclick={() => switchFilter('halloween')} />
            <Button icon="faPaw" onclick={() => switchFilter('dog')} />
            <Button icon="faForumbee" onclick={() => switchFilter('bees')} />
          </div>
        </Animated>

        {!showFilters && (
          <>
            <Button icon="faCircle" iconClass={styles.capture} />
            <Button
              icon="faLaugh"
              iconClass={styles.filter}
              onclick={() => setShowFilters(true)}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Camera;
