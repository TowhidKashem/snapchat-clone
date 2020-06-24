import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { promise, playSound, onAnimationComplete } from 'utils';
import { setFooterType } from 'AppShell/duck';
import { SetFooterType } from 'AppShell/types';
import { Filter } from './types';
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

const defaultFilters: Filter[] = ['dog', 'halloween', 'deform', 'bees', 'tmp'];

const Camera: React.FC<Props> = ({ setFooterType }) => {
  const videoElem = useRef<any>();
  const audioElem = useRef<any>(null);

  const [stream, setStream] = useState();

  const [loading, setLoading] = useState(false);
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [activeFilter, setActiveFilter] = useState<Filter | ''>('');
  const [filterInitialized, setFilterInitialized] = useState(false);

  const [takePic, setTakePic] = useState(false);

  useEffect(() => {
    initCamera();
  }, []);

  const initCamera = async () => {
    //@ts-ignore
    if (!('mediaDevices' in navigator)) navigator.mediaDevices = {};

    if (!('getUserMedia' in navigator.mediaDevices)) {
      //@ts-ignore
      navigator.mediaDevices.getUserMedia = (constraints) => {
        //@ts-ignore
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia() is not implemented!'));
        }
        return new Promise((resolve, reject) =>
          getUserMedia.call(navigator, constraints, resolve, reject)
        );
      };
    }

    const [error, response] = await promise(
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 414 }
          // height: { ideal: 736 }
        }
        // audio: true
      })
    );

    setStream(response);

    if (!error) videoElem.current.srcObject = response;
    else alert(error);
  };

  useEffect(() => {
    if (!activeFilter) return;
    window.Filters[activeFilter].init(() => {
      setFilterInitialized(true);
      setLoading(false);
      //@ts-ignore
      stream.getTracks().forEach((track) => track.stop());
    });
  }, [activeFilter]);

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
    if (filterInitialized) {
      const [error] = await promise(window.JEEFACEFILTERAPI.destroy());
      if (!error) setActiveFilter(selectFilter);
    } else {
      setActiveFilter(selectFilter);
    }
  };

  const showOpenMouth = (): boolean =>
    !loading && ['dog', 'halloween'].includes(activeFilter);

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
        muted
        playsInline
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
          onclick={() => {
            setTakePic(true);
            playSound('cameraShutter', audioElem.current);
          }}
        />

        {!showFilterButtons && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
            onclick={() => {
              setShowFilterButtons(true);
              setFooterType('none');
              // Load the center filter on the button list by default
              // 100ms is the animation duration of the filters container below
              onAnimationComplete(() => switchFilter(filters[2]), 100);
            }}
          />
        )}

        <Animated
          animationIn="slideInRight"
          animationOut="fadeOut"
          animationInDuration={100}
          animationOutDuration={0}
          isVisible={showFilterButtons}
          animateOnMount={false}
        >
          <div className="filters">
            {filters.map((filter) => (
              <Button
                key={filter}
                image={`./images/filter-${filter}.svg`}
                buttonClass={`filter-${filter}`}
                onclick={() => switchFilter(filter)}
              />
            ))}
          </div>
        </Animated>

        <Animated
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={100}
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
              onclick={async () => {
                setActiveFilter('');
                setShowFilterButtons(false);
                setFilterInitialized(false);
                setFooterType('full');
                initCamera(); // should we await here?
                await promise(window.JEEFACEFILTERAPI.destroy()); // do we need to await here?
              }}
            />
            <Button icon="faLaugh" round />
            <Button icon="faSearch" round />
          </div>
        </Animated>
      </section>

      <audio ref={audioElem} className="app-sound"></audio>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setFooterType: (footerType) => dispatch(setFooterType(footerType))
});

export default connect(null, mapDispatchToProps)(Camera);
