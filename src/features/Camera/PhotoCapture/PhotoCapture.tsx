import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { setPhoto } from '../CameraStore';
import { stretchViewPortHeight, canvasToBase64, base64ToBlob, downloadFile } from 'utils';
import { GENERIC_ERROR_RETRY } from 'utils/system';
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

  const { photos } = useSelector(({ camera }: RootStateOrAny) => camera);
  const latestPhoto = photos.data.length ? photos.data[0].images[0] : null;

  const canvasElem = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    stretchViewPortHeight();
  }, []);

  useEffect(() => {
    if (takePic) {
      takePhoto();

      if (canvasElem.current) {
        const base64url = canvasToBase64(canvasElem.current, 'image/png');
        dispatch(setPhoto(base64url));
      }
    }
  }, [takePic]);

  const takePhoto = () => {
    const { innerWidth, innerHeight } = window;
    const context = canvasElem.current?.getContext('2d');

    if (context) {
      context.canvas.width = innerWidth;
      context.canvas.height = innerHeight;
      context.drawImage(videoElem, 0, 0, innerWidth, innerHeight);
    }
  };

  const sharePhoto = async () => {
    const navigator = window.navigator as any;
    const errorMessage = "Your device doesn't support the Web Share API.";

    if (!navigator.share || !navigator.canShare) return alert(errorMessage);

    const blob = await base64ToBlob(latestPhoto);
    const files = [
      new File([blob], 'share.png', {
        type: blob.type
      })
    ];

    if (!navigator.canShare({ files })) return alert(errorMessage);

    try {
      navigator.share({
        title: 'Share',
        text: 'Hey, check out this photo I just took!',
        url: window.location.href,
        files
      });
    } catch (error) {
      alert(GENERIC_ERROR_RETRY);
    }
  };

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
              className="btn-download"
              onClick={() => downloadFile(latestPhoto)}
            />
            <Button icon="faExternalLinkAlt" label="Story" />
          </div>
          <div className="right">
            <Button
              icon="faPlayCircle"
              label="Send To"
              className="btn-share"
              onClick={sharePhoto}
            />
          </div>
        </footer>
      </div>
    </section>
  );
};

export default PhotoCapture;
