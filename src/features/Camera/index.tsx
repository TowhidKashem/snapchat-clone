import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { promise } from 'utils/system';
import { playSound } from 'utils/audio';
import { onAnimationComplete } from 'utils/animation';
import { setFooterType } from 'AppShell/duck';
import { SetFooterType } from 'AppShell/types';
import { Filter, FilterScript, PickPhoto, CameraMode } from './types';
import { pickPhoto } from './duck';
import PhotoCapture from './PhotoCapture';
import Button from 'common/Button';
import Loader from 'common/Loader';
import './index.scss';

declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: FilterScript;
  }
}

interface Props {
  setFooterType: SetFooterType;
  pickPhoto: PickPhoto;
  cameraMode: CameraMode;
}

const defaultFilters: Filter[] = ['dog', 'halloween', 'deform', 'bees', 'liberty'];

const Camera: React.FC<Props> = ({ setFooterType, pickPhoto, cameraMode }) => {
  const videoElem = useRef<HTMLVideoElement>(null);
  const audioElem = useRef<HTMLAudioElement>(null);

  const [loading, setLoading] = useState(false);
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [activeFilter, setActiveFilter] = useState<Filter>('');
  const [filterInitialized, setFilterInitialized] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [takePic, setTakePic] = useState(false);
  const [notSupported, setNotSupported] = useState(false);

  const startCamera = useCallback(async () => {
    const navigator: any = window.navigator;
    const maxWidth = (document.querySelector('#wrapper') as HTMLDivElement)?.offsetWidth;

    if (!('mediaDevices' in navigator)) navigator.mediaDevices = {};
    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = (constraints) => {
        const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia)
          return Promise.reject(new Error('getUserMedia() is not implemented!'));
        else
          return new Promise((resolve, reject) =>
            getUserMedia.call(navigator, constraints, resolve, reject)
          );
      };
    }

    const [error, response] = await promise(
      navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraMode,
          width: { ideal: maxWidth }
        }
      })
    );

    if (!error && videoElem.current) {
      videoElem.current.srcObject = response;
      setCameraStream(response);
    } else {
      setNotSupported(true);
    }
  }, [cameraMode]);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    if (!activeFilter) return;

    const stopCamera = () =>
      (cameraStream as any).getTracks().forEach((track) => track.stop());

    window.Filters[activeFilter].init(() => {
      setFilterInitialized(true);
      setLoading(false);
      stopCamera();
    });
  }, [activeFilter, cameraStream]);

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

      {notSupported && (
        <div className="not-supported">
          <p>
            <span role="img" aria-label="crying emoji">
              😭
            </span>{' '}
            Unfortunately your browser doesn't support the getUserMedia API used by the
            camera, please try another browser!
          </p>
        </div>
      )}

      <Animated
        animationIn="tada"
        animationOut="fadeOut"
        animationInDuration={1000}
        animationOutDuration={0}
        isVisible={showOpenMouth()}
        animateOnMount={false}
      >
        <div className="open-mouth">
          <strong>Open Mouth</strong>
          <span role="img" aria-label="tongue emoji">
            👅
          </span>
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
        videoElem={videoElem.current as HTMLVideoElement}
        pickPhoto={pickPhoto}
      />

      <section className="controls">
        <Button
          icon="faCircle"
          buttonClass="btn-capture"
          testId="btn-capture-main"
          onclick={() => {
            if (notSupported) return;
            setTakePic(true);
            if (audioElem.current) playSound('cameraShutter', audioElem.current);
          }}
        />

        {!showFilterButtons && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
            testId="btn-filters"
            onclick={() => {
              if (notSupported) return;
              setShowFilterButtons(true);
              setFooterType('none');
              // Load the center filter on the button list by default
              onAnimationComplete(() => switchFilter(filters[2]), 100);
            }}
          />
        )}

        <Animated
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={100}
          animationOutDuration={100}
          isVisible={showFilterButtons}
          animateOnMount={false}
        >
          <div className="filters" data-test="filters">
            {filters.map((filter) => (
              <Button
                key={filter}
                image={`./images/filter-${filter}.svg`}
                buttonClass={`filter-${filter}`}
                onclick={() => switchFilter(filter)}
              />
            ))}
          </div>

          <div className="filter-actions">
            <Button icon="faMagic" round />
            <Button icon="faQrcode" round />
            <Button
              icon="faTimesCircle"
              buttonClass="btn-close"
              onclick={() => {
                setActiveFilter('');
                setShowFilterButtons(false);
                setFilterInitialized(false);
                setFooterType('full');
                startCamera();
                window.JEEFACEFILTERAPI.destroy();
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

const mapStateToProps = ({ camera }) => ({ cameraMode: camera.cameraMode });

const mapDispatchToProps = (dispatch) => ({
  setFooterType: (footerType) => dispatch(setFooterType(footerType)),
  pickPhoto: (dataURL) => dispatch(pickPhoto(dataURL))
});

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
