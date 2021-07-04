import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import classNames from 'classnames';
import { hideDrawer } from 'AppShell/store';
import { removeSnap } from './store';
import { onAnimationComplete, relativeTime } from 'utils';
import Button from 'common/Button';
import './index.scss';

const Snap: React.FC = () => {
  const dispatch = useDispatch();
  const snap = useSelector(({ snap }: RootStateOrAny) => snap);
  const videoElem = useRef<HTMLVideoElement>(null);

  const { location, time, type, url, caption, shareable } = snap;

  useEffect(() => {
    if (type === 'video' && videoElem.current) {
      videoElem.current.load();
      videoElem.current.play();
    }
  }, [snap, type]);

  const closeSnap = () => {
    dispatch(hideDrawer('snap'));
    onAnimationComplete(() => dispatch(removeSnap()));
  };

  return (
    <main className="snap" onClick={closeSnap} data-test="snap">
      <header className={classNames({ metadata: location || time })}>
        {(location || time) && (
          <div className="left">
            {location && <span data-test="location">{location}</span>}
            {time && <time data-test="time">{relativeTime(time)}</time>}
          </div>
        )}
        <div className="right">
          <Button icon="faEllipsisV" />
        </div>
      </header>

      {type === 'video' ? (
        <div className="video-container">
          <video ref={videoElem} playsInline onEnded={closeSnap} data-test="video">
            <source src={url} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="image-container" data-test="image">
          {caption && (
            <div className="caption" data-test="caption">
              {caption}
            </div>
          )}
          <img src={url} alt="" />
        </div>
      )}

      {shareable && (
        <footer>
          <Button icon="faLocationArrow" />
        </footer>
      )}
    </main>
  );
};

export default Snap;
