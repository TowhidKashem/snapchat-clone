import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { loadScripts } from 'utils';
import { Filter } from './types';
import { dependencies, filters } from './data';
import useCamera from 'hooks/useCamera';
import PhotoCapture from './PhotoCapture';
import Button from 'common/Button';
import './index.scss';

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: any;
  }
}

const Camera: React.FC<{}> = () => {
  const videoElem = useRef<any>();

  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState<Filter | null>();
  const [filterReady, setFilterReady] = useState(false);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);
  const [takePic, setTakePic] = useState(false);

  // useCamera((videoStream) => (videoElem.current.srcObject = videoStream));

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

  const initFilter = (filter) => window.Filters[filter].init(() => setFilterReady(true));

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
                image={`./filters/${filter}.svg`}
                buttonClass={`filter-${filter}`}
                onclick={() => switchFilter(filter)}
              />
            ))}
          </div>
        </Animated>
      </section>
    </main>
  );
};

export default Camera;
