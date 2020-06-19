import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { promise, loadScripts } from 'utils';
import { setFooterType } from 'AppShell/duck';
import { SetFooterType } from 'AppShell/types';
import { Filter } from './types';
import { dependencies, filters as defaultFilters } from './data';
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

export const Camera: React.FC<Props> = ({ setFooterType }) => {
  const videoElem = useRef<any>();

  const [loading, setLoading] = useState(false);
  const [loadedScripts, setLoadedScripts] = useState<Filter[]>([]);
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [activeFilter, setActiveFilter] = useState<Filter | ''>('');
  const [filterInitialized, setFilterInitialized] = useState(false);

  const [takePic, setTakePic] = useState(false);

  //useCamera((videoStream) => (videoElem.current.srcObject = videoStream));

  useEffect(() => {
    if (!activeFilter) return;
    if (loadedScripts.includes(activeFilter)) {
      initFilter(activeFilter);
      // tmp
      setFilterInitialized(true);
      setLoading(false);
    } else {
      loadScripts(dependencies[activeFilter], () => {
        initFilter(activeFilter);
        setLoadedScripts([...loadedScripts, activeFilter]);
      });
    }
  }, [activeFilter]);

  const initFilter = (selectFilter: Filter) =>
    window.Filters[selectFilter].init(() => {
      // alert('fires once');
      setFilterInitialized(true);
      setLoading(false);
    });

  // Set the chosen filter at the center of the nav
  const setActiveFilterButton = (selectFilter: Filter) => {
    const newFilters = filters.filter((filter) => filter !== selectFilter);
    newFilters.splice(2, 0, selectFilter);
    setFilters(newFilters);
  };

  const switchFilter = async (selectFilter: Filter) => {
    if (selectFilter === activeFilter) return;
    setLoading(true);
    setActiveFilterButton(selectFilter);
    if (loadedScripts.length) {
      const [error] = await promise(window.JEEFACEFILTERAPI.destroy());
      if (!error) setActiveFilter(selectFilter);
    } else {
      setActiveFilter(selectFilter);
    }
  };

  const showOpenMouth = (): boolean =>
    !loading && ['dog', 'halloween'].includes(activeFilter);

  const animationInDuration = 100;

  return (
    <main className="camera">
      {loading && <Loader message="Applying Filter" fixed />}

      <Animated
        animationIn="tada"
        animationOut="fadeOut"
        animationInDuration={1000}
        animationOutDuration={0}
        isVisible={showOpenMouth()}
        animateOnMount={false}
      >
        <div className="open-mouth">
          <span>Open Mouth</span>
          👅
        </div>
      </Animated>

      <video
        ref={videoElem}
        autoPlay
        className={classNames('video-stream', {
          hide: filterInitialized || takePic
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

        {!showFilterButtons && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
            onclick={() => {
              setShowFilterButtons(true);
              setFooterType('none');
              setTimeout(() => {
                const defaultFilter = filters[2];
                setActiveFilter(defaultFilter);
                setLoading(true);
              }, animationInDuration);
            }}
          />
        )}

        <Animated
          animationIn="slideInRight"
          animationOut="fadeOut"
          animationInDuration={animationInDuration}
          animationOutDuration={0}
          isVisible={showFilterButtons}
          animateOnMount={false}
        >
          <div className="filters">
            {filters.map((filter) => (
              <Button
                key={filter}
                image={`./images/filters/${filter}.svg`}
                buttonClass={`filter-${filter}`}
                onclick={() => switchFilter(filter)}
              />
            ))}
          </div>
        </Animated>

        <Animated
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={animationInDuration}
          animationOutDuration={0}
          isVisible={showFilterButtons}
          animateOnMount={false}
        >
          <div className="filter-actions">
            <Button icon="faMagic" round />
            <Button icon="faQrcode" round />
            <Button
              icon="faTimesCircle"
              buttonClass="close"
              onclick={() => {
                setActiveFilter('');
                setShowFilterButtons(false);
                setFilterInitialized(false);
                setFooterType('full');
              }}
            />
            <Button icon="faLaugh" round />
            <Button icon="faSearch" round />
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
