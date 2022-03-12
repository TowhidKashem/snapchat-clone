import React, { useReducer, useRef, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { Animated } from 'react-animated-css';
import { setFooterType } from 'AppShell/AppShellStore';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import PhotoCapture from './PhotoCapture/PhotoCapture';
import { getDeviceWidth, playSound, onAnimationComplete } from 'utils';
import { GENERIC_ERROR } from 'utils/system';
import { Filter, FilterState, CameraState, filterButtonIcons } from './data';
import './Camera.scss';

const Camera: React.FC = () => {
  const dispatch = useDispatch();
  const { cameraMode } = useSelector(({ camera }: RootStateOrAny) => camera);

  const [filter, dispatchFilter] = useReducer(
    (prevState: FilterState, action: Partial<FilterState>) => ({
      ...prevState,
      ...action
    }),
    {
      initialized: false,
      isLoading: false,
      showButtons: false,
      filters: ['dog', 'halloween', 'deform', 'bees', 'liberty'],
      active: null
    }
  );

  const [camera, dispatchCamera] = useReducer(
    (prevState: CameraState, action: Partial<CameraState>) => ({
      ...prevState,
      ...action
    }),
    {
      isBrowserCompatible: true,
      stream: null,
      capture: false
    }
  );

  const { isLoading, initialized, showButtons, filters, active } = filter;
  const { isBrowserCompatible, capture, stream } = camera;

  const videoElem = useRef<HTMLVideoElement>(null);
  const audioElem = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    startCamera();
  }, [cameraMode]);

  const startCamera = async () => {
    try {
      if (videoElem.current) {
        const response = await window.navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: cameraMode,
            width: {
              ideal: getDeviceWidth()
            }
          }
        });
        videoElem.current.srcObject = response;
        dispatchCamera({ stream: response });
      }
    } catch (error) {
      dispatchCamera({ isBrowserCompatible: false });
    }
  };

  const stopCamera = () => stream?.getTracks().forEach((track) => track.stop());

  const setFilter = async (newFilter: Filter) => {
    // Set new filter's icon in the middle button
    const newFilters = filters.filter((filter) => filter !== newFilter);
    newFilters.splice(2, 0, newFilter);

    dispatchFilter({
      isLoading: true,
      filters: newFilters
    });

    if (initialized) await window.JEEFACEFILTERAPI.destroy();

    window.Filters[newFilter].init((errorCode: string) => {
      if (errorCode) {
        removeFilter();
        dispatchFilter({ isLoading: false });
        alert(GENERIC_ERROR);
      } else {
        stopCamera();
        dispatchFilter({
          initialized: true,
          isLoading: false,
          active: newFilter
        });
      }
    });
  };

  const removeFilter = () => {
    dispatchFilter({
      initialized: false,
      showButtons: false,
      active: null
    });
    startCamera();
    dispatch(setFooterType('full'));
    window.JEEFACEFILTERAPI.destroy();
  };

  const showOpenMouth = !isLoading && ['dog', 'halloween'].includes(active || '');

  return (
    <main className="camera">
      {isLoading && <Loader message="Applying Filter" fixed />}

      {!isBrowserCompatible && (
        <div className="not-supported">
          <p>
            <span role="img" aria-label="crying emoji">
              😭
            </span>{' '}
            Either your browser doesn't support the MediaDevices API used by the camera or
            you declined camera access!
          </p>
        </div>
      )}

      <Animated
        animationIn="tada"
        animationOut="fadeOut"
        animationInDuration={1000}
        animationOutDuration={0}
        isVisible={showOpenMouth}
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
        className={classNames('video-stream', {
          hide: initialized || capture
        })}
        playsInline
        autoPlay
        muted
      />

      {videoElem.current && (
        <PhotoCapture
          takePic={capture}
          closePic={() => dispatchCamera({ capture: false })}
          videoElem={videoElem.current}
        />
      )}

      <section className="controls">
        <Button
          icon="faCircle"
          className="btn-capture"
          testId="btn-capture-main"
          onClick={() => {
            if (isBrowserCompatible && audioElem.current) {
              dispatchCamera({ capture: true });
              playSound('cameraShutter', audioElem.current);
            }
          }}
        />

        {!showButtons && (
          <Button
            icon="faLaugh"
            className="btn-filters"
            testId="btn-filters"
            onClick={() => {
              if (isBrowserCompatible) {
                dispatchFilter({ showButtons: true });
                dispatch(setFooterType('none'));
                // Load the center filter in the button list by default
                onAnimationComplete(() => setFilter(filters[2]), 100);
              }
            }}
          />
        )}

        <Animated
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInDuration={100}
          animationOutDuration={100}
          isVisible={showButtons}
          animateOnMount={false}
        >
          <div className="filters" data-test="filters">
            {filters.map((filter) => (
              <Button
                key={filter}
                className={filter}
                svg={filterButtonIcons[filter]}
                onClick={() => filter !== active && setFilter(filter)}
              />
            ))}
          </div>

          <div className="filter-actions">
            <Button icon="faMagic" round />
            <Button icon="faQrcode" round />
            <Button icon="faTimesCircle" className="btn-close" onClick={removeFilter} />
            <Button icon="faLaugh" round />
            <Button icon="faSearch" round />
          </div>
        </Animated>
      </section>

      <audio ref={audioElem} className="app-sound" />
    </main>
  );
};

export default Camera;
