//@ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { loadScripts } from 'utils';
import { setFooterType } from 'AppShell/duck';
import { SetFooterType } from 'AppShell/types';
import { Filter } from './types';
import { dependencies, defaultFilters } from './data';
import useCamera from 'hooks/useCamera';
import PhotoCapture from './PhotoCapture';
import Button from 'common/Button';
import Loader from 'common/Loader';
import './index.scss';

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: any;
  }
}

interface Props {
  setFooterType: SetFooterType;
}

const Camera: React.FC<Props> = ({ setFooterType }) => {
  const videoElem = useRef();

  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [filter, setFilter] = useState<Filter>();
  const [filterReady, setFilterReady] = useState(false);
  const [loadedFilters, setLoadedFilters] = useState<Filter[]>([]);
  const [takePic, setTakePic] = useState(false);

  useCamera((videoStream) => (videoElem.current.srcObject = videoStream));

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

  const initFilter = (filter) =>
    window.Filters[filter].init(() => {
      setFilterReady(true);
      setLoading(false);
    });

  const switchFilter = async (selectFilter: Filter) => {
    setLoading(true);

    // Set the current filter in the center of the filter nav
    const newFilters = filters.filter((filter) => filter !== selectFilter);
    newFilters.splice(2, 0, selectFilter);
    setFilters(newFilters);

    if (loadedFilters.length) {
      try {
        await window.JEEFACEFILTERAPI.destroy();
        setFilter(selectFilter);
      } catch (err) {}
    } else {
      setFilter(selectFilter);
    }
  };

  const showOpenMouth = () => !loading && ['dog', 'halloween'].includes(filter);

  const animationDuration = 100;

  return (
    <main className="camera">
      {loading && <Loader message="Applying Filter.." />}

      {showOpenMouth() && (
        <div class="open-mouth">
          <span>Open Mouth</span>
          👅
        </div>
      )}

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
        <Button
          icon="faCircle"
          buttonClass="btn-capture"
          onclick={() => setTakePic(true)}
        />

        {!showFilters && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
            onclick={() => {
              // setTimeout(() => {
              //   setLoading(true);
              //   setFilter(filters[2]);
              // }, animationDuration);
              setShowFilters(true);
              setFooterType('none');
            }}
          />
        )}

        <Animated
          animationIn="slideInRight"
          animationOut="fadeOut"
          animationInDuration={animationDuration}
          animationOutDuration={0}
          isVisible={showFilters}
          animateOnMount={false}
        >
          <div className="filters">
            {filters.map((filter, index) => (
              <Button
                key={filter + index}
                image={`./images/filters/${filter}.svg`}
                buttonClass={`filter-${filter}`}
                onclick={() => switchFilter(filter)}
              />
            ))}
          </div>
        </Animated>

        <Animated
          // animationIn="slideInRight"
          // animationOut="fadeOut"
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={animationDuration}
          animationOutDuration={0}
          isVisible={showFilters}
          animateOnMount={false}
        >
          <div className="filter-actions">
            <Button icon="faMagic" />
            <Button icon="faQrcode" />
            <Button
              icon="faTimesCircle"
              buttonClass="close"
              onclick={() => {
                setShowFilters(false);
                setFilter(null);
                setFilterReady(false);
                setFooterType('full');
              }}
            />
            <Button icon="faLaugh" />
            <Button icon="faSearch" />
          </div>
        </Animated>
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setFooterType: (footerType) => dispatch(setFooterType(footerType))
});

export default connect(null, mapDispatchToProps)(Camera);
