import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import Button from 'common/Button';
import './index.scss';

interface Props {
  takePic: boolean;
  closePic: () => void;
  videoElem: any;
}

const PhotoCapture: React.FC<Props> = ({ takePic, closePic, videoElem }) => {
  const canvasElem = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const takePhoto = () => {
      const { innerWidth, innerHeight } = window;
      const context = canvasElem?.current?.getContext('2d');
      if (context) {
        context.canvas.width = innerWidth;
        context.canvas.height = innerHeight;
        // ctx.scale(2, 2)
        context.drawImage(videoElem.current, 0, 0, innerWidth, innerHeight);
      }
    };
    if (takePic) takePhoto();
  }, [takePic, videoElem]);

  const downloadPhoto = () => {
    const dataURL = canvasElem?.current
      ?.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
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
