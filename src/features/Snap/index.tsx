import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { relativeTime } from 'utils';
import { Snap as SnapType } from './types';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  snap: SnapType;
  hideDrawer: HideDrawer;
}

const Snap: React.FC<Props> = ({ snap, hideDrawer }) => {
  const videoElem = useRef<any>();
  const { location, time, type, url, caption } = snap;

  useEffect(() => {
    if (type === 'video') {
      videoElem.current.load();
      videoElem.current.play();
    }
  }, [snap]);

  return (
    <main className="snap" onClick={() => hideDrawer('snap')}>
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={11}>
              {location}
              <time>{relativeTime(time)}</time>
            </Col>
            <Col xs={1}>
              <Icon icon="faEllipsisV" />
            </Col>
          </Row>
        </Grid>
      </header>
      {type === 'video' ? (
        <div className="video-container">
          <video ref={videoElem} onEnded={() => hideDrawer('snap')}>
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
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snap);
