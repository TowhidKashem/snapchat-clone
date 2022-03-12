import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../CameraStore';
import { isIOS, stretchViewPortHeight } from 'utils';
import Button from 'components/Button/Button';
import './PhotoCapture.scss';

const buttons = [
  'faTextHeight',
  'faPen',
  'faStickyNote',
  'faCut',
  'faPaperclip',
  'faCropAlt',
  'faStopwatch'
];

const PhotoCapture: React.FC<
  Readonly<{
    takePic: boolean;
    closePic: () => void;
    videoElem: HTMLVideoElement;
  }>
> = ({ takePic, closePic, videoElem }) => {
  const dispatch = useDispatch();
  const canvasElem = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    stretchViewPortHeight();
  }, []);

  useEffect(() => {
    if (takePic) {
      takePhoto();
      dispatch(setPhoto(getDataURL()));
    }
  }, [takePic]);

  const takePhoto = () => {
    const { innerWidth, innerHeight } = window;
    const context = canvasElem?.current?.getContext('2d');
    if (context) {
      context.canvas.width = innerWidth;
      context.canvas.height = innerHeight;
      context.drawImage(videoElem, 0, 0, innerWidth, innerHeight);
    }
  };

  const downloadPhoto = () => {
    const dataURL = getDataURL();
    if (isIOS()) {
      window.open(dataURL, '_blank');
    } else {
      const link = document.createElement('a');
      link.download = 'download.png';
      link.href = dataURL;
      link.click();
    }
  };

  const getDataURL = () => canvasElem?.current?.toDataURL('image/png') || '';

  return (
    <section
      data-test="photo-capture"
      className={classNames('photo-capture', {
        hide: !takePic
      })}
    >
      <div className="inner">
        <header>
          <Button icon="faTimes" onClick={closePic} testId="btn-close" />
        </header>
        <canvas ref={canvasElem} />
        <aside>
          {buttons.map((button) => (
            <Button key={button} icon={button} />
          ))}
        </aside>
        <footer>
          <div className="left">
            <Button
              icon="faDownload"
              label="Save"
              onClick={downloadPhoto}
              className="btn-download"
            />
            <Button icon="faExternalLinkAlt" label="Story" />
          </div>
          <div className="right">
            <Button icon="faPlayCircle" label="Send To" />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default PhotoCapture;
