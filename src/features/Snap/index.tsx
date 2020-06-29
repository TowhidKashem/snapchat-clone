import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { relativeTime } from 'utils/time';
import { onAnimationComplete } from 'utils/animation';
import { Snap as SnapType } from './types';
import { removeSnap } from './duck';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  snap: SnapType;
  removeSnap: () => void;
  hideDrawer: HideDrawer;
}

const Snap: React.FC<Props> = ({ snap, removeSnap, hideDrawer }) => {
  const { location, time, type, url, caption } = snap;

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
    <main className="snap" onClick={closeSnap}>
      <header>
        {location && time && (
          <div className="left">
            {location}
            <time>{relativeTime(time)}</time>
          </div>
        )}
        <div className="right">
          <Icon icon="faEllipsisV" />
        </div>
      </header>
      {type === 'video' ? (
        <div className="video-container">
          <video ref={videoElem} onEnded={closeSnap}>
            <source src={url} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="image-container">
          {caption && <div className="caption">{caption}</div>}
          <img src={url} alt="" />
        </div>
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
