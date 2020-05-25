import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { Drawer } from 'AppShell/types';
import Button from 'common/Button';
// import useCamera from 'hooks/useCamera';
import { loadScripts, showVideo } from 'utils';
import { Filter } from './types';
import { dependencies, filters } from './data';
import './index.scss';

interface Props {
  drawers: Drawer[];
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
  const [filterReady, setFilterReady] = useState<boolean>(false);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);

  const [videoStream, setVideoStream] = useState<any>();

  useEffect(() => {
    // startVideo();
  }, []);

  // Start/stop video when drawer is opened and closed
  useEffect(() => {
    // const atleastOneDrawerOpen = drawers.some(({ show }) => show);
    // if (atleastOneDrawerOpen) stopVideo();
    // else startVideo();
    // startVideo();
  }, [drawers]);

  const initFilter = (filter) => {
    window.Filters[filter].init(() => setFilterReady(true));
  };

  useEffect(() => {
    if (!filter) return;
    if (loadedFilters.includes(filter)) {
      initFilter(filter);
    } else {
      loadScripts(dependencies[filter], () => {
        initFilter(filter);
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
      // stopVideo();
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
    <main className="camera">
      <video
        ref={videoPlayer}
        autoPlay
        className={classNames('video-stream', {
          hide: filterReady
        })}
      ></video>

      <section className="controls">
        {/* Tmp */}
        {showFilters && (
          <Button
            icon="faTimesCircle"
            iconClass="close"
            onclick={() => {
              try {
                window.JEEFACEFILTERAPI.destroy();
              } catch (err) {}
              setShowFilters(false);
              setFilter(null);
              setFilterReady(false);
              startVideo();
            }}
          />
        )}

        <Button icon="faCircle" buttonClass="btn-capture" />

        {!showFilters && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
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
          <div className="filters">
            {filters.map((filter, index) => (
              <Button
                key={filter + index}
                image={`./filters/${filter}.svg`}
                buttonClass={`filter-${filter}`}
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
