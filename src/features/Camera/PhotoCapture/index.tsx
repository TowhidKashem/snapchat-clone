import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { playSound } from 'utils';
import Button from 'common/Button';
import './index.scss';

interface Props {
  takePic: boolean;
  closePic: () => void;
  videoElem: any;
}

const PhotoCapture: React.FC<Props> = ({ takePic, closePic, videoElem }) => {
  const canvasElem = useRef<HTMLCanvasElement>(null);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);

  useEffect(() => {
    if (takePic) takePhoto();
  }, [takePic]);

  const takePhoto = () => {
    const { innerWidth, innerHeight } = window;
    const context = canvasElem?.current?.getContext('2d');
    if (context) {
      context.canvas.width = innerWidth;
      context.canvas.height = innerHeight;
      context.drawImage(videoElem.current, 0, 0, innerWidth, innerHeight);
    }
    playSound('cameraShutter');
    setPhotoTaken(true);
  };

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
        <Grid fluid>
          <Row middle="xs">
            <Col xs={2}>
              <Button icon="faDownload" label="Save" onclick={downloadPhoto} />
            </Col>
            <Col xs={2}>
              <Button icon="faExternalLinkAlt" label="Story" />
            </Col>
            <Col xs={8}>
              <Row end="xs" middle="xs">
                <Button icon="faPlayCircle" label="Send To" />
              </Row>
            </Col>
          </Row>
        </Grid>
      </footer>
    </section>
  );
};

export default PhotoCapture;
