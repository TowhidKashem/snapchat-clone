import React, { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-animated-css';
import Button from 'common/Button';
import useVideo from 'hooks/useVideo';
import { loadScripts } from 'utils';
import styles from './index.module.scss';

type Filter = 'dog' | 'bees' | 'halloween' | 'deform' | null;

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: any;
  }
}

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

const Camera: React.FC<{}> = () => {
  const videoPlayer = useRef<any>();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>(null);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);

  // useVideo((stream) => {
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
        await window.JEEFACEFILTERAPI.destroy();
        setFilter(filter);
      } catch (err) {}
    } else {
      setFilter(filter);
    }
  };

  const filterButtons = [
    {
      filter: 'dog',
      icon: 'faPaw'
    },
    {
      filter: 'halloween',
      icon: 'faSpider'
    },
    {
      filter: 'bees',
      icon: 'faForumbee',
      className: styles.main
    }
  ];

  return (
    <main className={styles.camera}>
      <video ref={videoPlayer} autoPlay></video>

      <section className={styles.controls}>
        <Button icon="faCircle" buttonClass={styles.btnCapture} />
        {!showFilters && (
          <Button
            icon="faLaugh"
            buttonClass={styles.btnFilters}
            onclick={() => setShowFilters(true)}
          />
        )}

        {showFilters && (
          <Button
            icon="faTimesCircle"
            iconClass={styles.close}
            onclick={() => setShowFilters(false)}
          />
        )}

        <Animated
          animationIn="slideInRight"
          animationOut="fadeOut"
          animationInDuration={100}
          animationOutDuration={0}
          isVisible={showFilters}
          animateOnMount={false}
        >
          <div className={styles.filters}>
            {filterButtons.map(({ icon, filter, className }) => (
              <Button
                icon={icon}
                onclick={() => switchFilter(filter as Filter)}
                buttonClass={className}
              />
            ))}
            <Button icon="faForumbee" onclick={() => switchFilter('bees')} />
            <Button icon="faPaw" onclick={() => switchFilter('dog')} />
          </div>
        </Animated>
      </section>
    </main>
  );
};

export default Camera;
