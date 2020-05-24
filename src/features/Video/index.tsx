import React from 'react';
import { connect } from 'react-redux';
import { HideDrawer } from 'AppShell/Drawer/types';
import { hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  media: any;
  videoId: string;
  hideDrawer: HideDrawer;
}

const Video: React.FC<Props> = ({ media, hideDrawer }) => {
  return (
    <main className="video">
      {/* <button onClick={() => hideDrawer('video')} style={{ color: '#fff' }}>
      Close
    </button> */}
      <header>
        <Grid fluid>
          <Row middle="xs">
            <Col xs={11}>
              {media.video.location}
              <time>{media.video.time}</time>
            </Col>
            <Col xs={1}>
              <Icon icon="faEllipsisV" />
            </Col>
          </Row>
        </Grid>
      </header>
      <div className="video-container">
        <video autoPlay onEnded={() => hideDrawer('video')}>
          <source src="./sample-video.mp4" type="video/mp4" />
        </video>
      </div>
    </main>
  );
};

const mapStateToProps = ({ media }) => ({ media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
