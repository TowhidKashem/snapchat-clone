import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setPhoto } from '../store';
import { isIOS, stretchViewPortHeight } from 'utils';
import Button from 'common/Button';
import './index.scss';

const PhotoCapture: React.FC<{
  readonly takePic: boolean;
  readonly closePic: () => void;
  readonly videoElem: HTMLVideoElement;
}> = ({ takePic, closePic, videoElem }) => {
  const dispatch = useDispatch();
  const canvasElem = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    stretchViewPortHeight();
  }, []);

  const getDataURL = () => canvasElem?.current?.toDataURL('image/png') || '';

  useEffect(() => {
    const takePhoto = () => {
      const { innerWidth, innerHeight } = window;
      const context = canvasElem?.current?.getContext('2d');
      if (context) {
        context.canvas.width = innerWidth;
        context.canvas.height = innerHeight;
        context.drawImage(videoElem, 0, 0, innerWidth, innerHeight);
      }
    };
    if (takePic) {
      takePhoto();
      dispatch(setPhoto(getDataURL()));
    }
  }, [takePic, videoElem, dispatch]);

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

  const buttons = [
    'faTextHeight',
    'faPen',
    'faStickyNote',
    'faCut',
    'faPaperclip',
    'faCropAlt',
    'faStopwatch'
  ];

  return (
    <section
      data-test="photo-capture"
      className={classNames('photo-capture', { hide: !takePic })}
    >
      <div className="inner">
        <header>
          <Button icon="faTimes" onclick={closePic} testId="btn-close" />
        </header>
        <canvas ref={canvasElem}></canvas>
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
              onclick={downloadPhoto}
              buttonClass="btn-download"
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
