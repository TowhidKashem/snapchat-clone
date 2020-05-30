import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Animated } from 'react-animated-css';
import { loadScripts, showVideo } from 'utils';
import { Drawer } from 'AppShell/types';
import { Filter } from './types';
import { dependencies, filters } from './data';
import PhotoCapture from './PhotoCapture';
import Button from 'common/Button';
// import useCamera from 'hooks/useCamera';
import './index.scss';

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: any;
  }
}

interface Props {
  drawers: Drawer[];
}

const Camera: React.FC<Props> = ({ drawers }) => {
  const videoElem = useRef<any>();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter | null>();
  const [filterReady, setFilterReady] = useState<boolean>(false);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);
  const [takePic, setTakePic] = useState<boolean>(false);

  useEffect(() => {
    // startVideo();
  }, []);

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
      // JEEFACEFILTERAPI.toggle_pause(true, true);
      setFilter(filter);
    }
  };

  const startVideo = () =>
    showVideo((stream) => {
      videoElem.current.srcObject = stream;
    });

  // const stopVideo = () => videoStream?.getTracks()[0].stop();

  return (
    <main className="camera">
      <video
        ref={videoElem}
        autoPlay
        className={classNames('video-stream', {
          hide: filterReady || takePic
        })}
      ></video>

      <PhotoCapture
        takePic={takePic}
        closePic={() => setTakePic(false)}
        videoElem={videoElem}
      />

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

        <Button
          icon="faCircle"
          buttonClass="btn-capture"
          onclick={() => setTakePic(true)}
        />

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
                image={'./filters/' + filter + '.svg'}
                buttonClass={'filter-' + filter}
                onclick={() => switchFilter(filter)}
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
