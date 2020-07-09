import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { relativeTime } from 'utils/time';
import { onAnimationComplete } from 'utils/animation';
import { Snap as SnapType } from './types';
import { removeSnap } from './duck';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import Button from 'common/Button';
import './index.scss';

interface Props {
  snap: SnapType;
  removeSnap: () => void;
  hideDrawer: HideDrawer;
}

const Snap: React.FC<Props> = ({ snap, removeSnap, hideDrawer }) => {
  const { location, time, type, url, caption, shareable } = snap;

  const videoElem = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type === 'video' && videoElem.current) {
      videoElem.current.load();
      videoElem.current.play();
    }
  }, [snap, type]);

  const closeSnap = () => {
    hideDrawer('snap');
    onAnimationComplete(() => removeSnap());
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

const mapStateToProps = ({ snap }) => ({ snap });

const mapDispatchToProps = (dispatch) => ({
  removeSnap: () => dispatch(removeSnap()),
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snap);
