import React from 'react';
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
        <video autoPlay onEnded={() => hideDrawer('video')}>
          <source src={`./videos/${video.file}#t=10,20`} type="video/mp4" />
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
