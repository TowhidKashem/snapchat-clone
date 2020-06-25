import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'common/Button';
import { SetPhoto } from '../types';
import './index.scss';

interface Props {
  takePic: boolean;
  closePic: () => void;
  // videoElem: React.Ref<HTMLVideoElement>;
  videoElem: any;
  setPhoto: SetPhoto;
}

const PhotoCapture: React.FC<Props> = ({ takePic, closePic, videoElem, setPhoto }) => {
  const canvasElem = useRef<HTMLCanvasElement>(null);

  const getDataURL = () => canvasElem?.current?.toDataURL('image/png') || '';

  useEffect(() => {
    const takePhoto = () => {
      const { innerWidth, innerHeight } = window;
      const context = canvasElem?.current?.getContext('2d');
      if (context) {
        context.canvas.width = innerWidth;
        context.canvas.height = innerHeight;
        context.drawImage(videoElem.current, 0, 0, innerWidth, innerHeight);
      }
    };
    if (takePic) {
      takePhoto();
      setPhoto(getDataURL());
    }
  }, [takePic, videoElem, setPhoto]);

  const downloadPhoto = () => {
    const dataURL = getDataURL().replace('image/png', 'image/octet-stream');
    window.location.href = dataURL as string;
  };

  return (
    <section
      className={classNames('photo-capture', {
        hide: !takePic
      })}
    >
      <header>
        <Button icon="faTimes" onclick={closePic} />
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
        <div className="left">
          <Button icon="faDownload" label="Save" onclick={downloadPhoto} />
          <Button icon="faExternalLinkAlt" label="Story" />
        </div>
        <div className="right">
          <Button icon="faPlayCircle" label="Send To" />
        </div>
      </footer>
    </section>
  );
};

export default PhotoCapture;
