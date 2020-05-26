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
  const videoElem = useRef<any>();
  const canvasElem = useRef<any>();

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [filterReady, setFilterReady] = useState<boolean>(false);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);
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
      videoElem.current.srcObject = stream;
      setVideoStream(stream);
    });
  };

  const stopVideo = () => videoStream.getTracks()[0].stop();

  const takePhoto = () => {
    const { innerWidth, innerHeight } = window;
    const context = canvasElem.current.getContext('2d');
    context.canvas.width = innerWidth;
    context.canvas.height = innerHeight;
    context.drawImage(videoElem.current, 0, 0, innerWidth, innerHeight);
    new Audio('./audio/shutter.mp3').play();
    setPhotoTaken(true);
  };

  const downloadPhoto = () => {
    const dataURL = canvasElem.current
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    window.location.href = dataURL;
  };

  return (
    <main className="camera">
      <video
        ref={videoElem}
        autoPlay
        className={classNames('video-stream', {
          hide: filterReady || photoTaken
        })}
      ></video>

      <div
        className={classNames('photo-capture', {
          hide: !photoTaken
        })}
      >
        <header>
          <Button icon="faTimes" onclick={() => {}} />
        </header>
        <canvas ref={canvasElem}></canvas>
        <aside>
          <Button icon="faTextHeight" />
          <Button icon="faPen" />
          <Button icon="faStickyNote" />
          <Button icon="faCut" />
          <Button icon="faPaperclip" />
          <Button icon="faCropAlt" />
          <Button icon="faStopwatch" />
        </aside>
        <footer>
          <Button icon="faDownload" label="Save" onclick={downloadPhoto} />
          <Button icon="faExternalLinkAlt" label="Story" />
          <Button icon="faPlayCircle" label="Send To" />
        </footer>
      </div>

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

        <Button icon="faCircle" buttonClass="btn-capture" onclick={takePhoto} />

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
