import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  video: any;
  hideDrawer: HideDrawer;
}

const Video: React.FC<Props> = ({ video, hideDrawer }) => {
  const videoElem = useRef<any>();

  useEffect(() => {
    videoElem.current.currentTime = 0;
    videoElem.current.play();
  }, [video]);

  return (
    <main className="video">
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={11}>
              {video.location}
              <time>{video.time}</time>
            </Col>
            <Col xs={1}>
              <Icon icon="faEllipsisV" />
            </Col>
          </Row>
        </Grid>
      </header>
      <div className="video-container">
        <video
          ref={videoElem}
          autoPlay
          controls
          onEnded={() => {
            alert('hey');
            // hideDrawer('video');
          }}
        >
          <source src={'./video/' + video.file + '#t=0,3'} type="video/mp4" />
        </video>
      </div>
    </main>
  );
};

const mapStateToProps = ({ media }) => ({ video: media.video });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
