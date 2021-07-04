import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { setFooterType } from 'AppShell/store';
import { Object } from 'types';
import { Filter } from './types';
import { promise, playSound, onAnimationComplete } from 'utils';
import Button from 'common/Button';
import Loader from 'common/Loader';
import PhotoCapture from './PhotoCapture';
import './index.scss';

const defaultFilters: Filter[] = ['dog', 'halloween', 'deform', 'bees', 'liberty'];

const errorMessageMap: Object<string> = {
  GL_INCOMPATIBLE: 'Browser does not support webGL'
};

const Camera: React.FC = () => {
  const dispatch = useDispatch();
  const { cameraMode } = useSelector(({ camera }: RootStateOrAny) => camera);

  const videoElem = useRef<HTMLVideoElement>(null);
  const audioElem = useRef<HTMLAudioElement>(null);

  const [loading, setLoading] = useState(false);
  const [showFilterButtons, setShowFilterButtons] = useState(false);
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [activeFilter, setActiveFilter] = useState<Filter>('');
  const [filterInitialized, setFilterInitialized] = useState(false);
  const [cameraStream, setCameraStream] = useState<any>(null);
  const [takePic, setTakePic] = useState(false);
  const [hasBrowserSupport, setHasBrowserSupport] = useState(true);

  const startCamera = useCallback(async () => {
    const { navigator }: any = window;
    const maxWidth = (document.querySelector('#wrapper') as HTMLDivElement)?.offsetWidth;

    if (!('mediaDevices' in navigator)) navigator.mediaDevices = {};
    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = (constraints: any) => {
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
      setHasBrowserSupport(false);
    }
  }, [cameraMode]);

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

  const stopFilter = useCallback(() => {
    setActiveFilter('');
    setShowFilterButtons(false);
    setFilterInitialized(false);
    dispatch(setFooterType('full'));
    startCamera();
    window.JEEFACEFILTERAPI.destroy();
  }, [dispatch, startCamera]);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    if (!activeFilter) return;

    const stopCamera = () =>
      cameraStream?.getTracks().forEach((track: any) => track.stop());

    window.Filters[activeFilter].init((errCode: string) => {
      if (errCode) {
        alert(errorMessageMap[errCode] || 'Something went wrong!');
        setLoading(false);
        stopFilter();
      } else {
        setFilterInitialized(true);
        setLoading(false);
        stopCamera();
      }
    });
  }, [activeFilter, cameraStream, stopFilter]);

  const showOpenMouth = (): boolean =>
    !loading && ['dog', 'halloween'].includes(activeFilter);

  return (
    <main className="camera">
      {loading && <Loader message="Applying Filter" fixed />}

      {!hasBrowserSupport && (
        <div className="not-supported">
          <p>
            <span role="img" aria-label="crying emoji">
              😭
            </span>{' '}
            Either your browser doesn't support the getUserMedia API used by the camera or
            you declined camera access!
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
      />

      {videoElem.current && (
        <PhotoCapture
          takePic={takePic}
          closePic={() => setTakePic(false)}
          videoElem={videoElem.current}
        />
      )}

      <section className="controls">
        <Button
          icon="faCircle"
          buttonClass="btn-capture"
          testId="btn-capture-main"
          onclick={() => {
            if (hasBrowserSupport) {
              setTakePic(true);
              if (audioElem.current) playSound('cameraShutter', audioElem.current);
            }
          }}
        />

        {!showFilterButtons && (
          <Button
            icon="faLaugh"
            buttonClass="btn-filters"
            testId="btn-filters"
            onclick={() => {
              if (hasBrowserSupport) {
                setShowFilterButtons(true);
                dispatch(setFooterType('none'));
                onAnimationComplete(() => switchFilter(filters[2]), 100); // Load the center filter on the button list by default
              }
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
            <Button icon="faTimesCircle" buttonClass="btn-close" onclick={stopFilter} />
            <Button icon="faLaugh" round />
            <Button icon="faSearch" round />
          </div>
        </Animated>
      </section>

      <audio ref={audioElem} className="app-sound"></audio>
    </main>
  );
};

export default Camera;
