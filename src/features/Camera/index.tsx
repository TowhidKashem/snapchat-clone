import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import classNames from 'classnames';
import Button from 'common/Button';
// import useVideo from 'hooks/useVideo';
import { loadScripts, showVideo } from 'utils';
import { dependencies, filterButtons } from './data';
import styles from './index.module.scss';

type Filter = 'dog' | 'bees' | 'halloween' | 'deform';

interface Props {
  drawers: any;
}

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: any;
  }
}

const Camera: React.FC<Props> = ({ drawers }) => {
  const videoPlayer = useRef<any>();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);

  const [videoStream, setVideoStream] = useState<any>();

  // Start/stop video when drawer is opened and closed
  useEffect(() => {
    const atleastOneDrawerOpen = drawers.some(({ show }) => show);
    // if (atleastOneDrawerOpen) stopVideo();
    // else startVideo();
    // startVideo();
  }, [drawers]);

  // If a filter is selected load it's dependencies and call the filter's init method
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

  const startVideo = () => {
    showVideo((stream) => {
      videoPlayer.current.srcObject = stream;
      setVideoStream(stream);
    });
  };

  const stopVideo = () => videoStream.getTracks()[0].stop();

  return (
    <main className={styles.camera}>
      <video
        ref={videoPlayer}
        autoPlay
        className={classNames(styles.videoStream, {
          [styles.hide]: filter
        })}
      ></video>

      <section className={styles.controls}>
        {/* Tmp */}
        {showFilters && (
          <Button
            icon="faTimesCircle"
            iconClass={styles.close}
            onclick={() => {
              window.JEEFACEFILTERAPI.destroy();
              setShowFilters(false);
              setFilter(null);
              startVideo();
            }}
          />
        )}

        <Button icon="faCircle" buttonClass={styles.btnCapture} />

        {!showFilters && (
          <Button
            icon="faLaugh"
            buttonClass={styles.btnFilters}
            onclick={() => setShowFilters(true)}
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
            {filterButtons.map(({ icon, filter }) => (
              <Button
                key={filter}
                icon={icon}
                onclick={() => switchFilter(filter as Filter)}
              />
            ))}
          </div>
        </Animated>
      </section>
    </main>
  );
};

const mapStateToProps = ({ app }) => ({ drawers: app.drawers });

export default connect(mapStateToProps, null)(Camera);
