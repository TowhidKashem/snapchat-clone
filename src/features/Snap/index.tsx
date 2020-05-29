import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Snap as SnapType } from './types';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  media: any;
  hideDrawer: HideDrawer;
}

const Snap: React.FC<Props> = ({ media, hideDrawer }) => {
  const videoElem = useRef<any>();
  const currentIndex = useState<number>(0);

  useEffect(() => {
    videoElem.current.load();
    videoElem.current.play();
  }, [media]);

  return (
    <main className="snaps">
      Hello
      {/* {snaps.map((snap) => (
        <main className="media">
          <header>
            <Grid fluid>
              <Row middle="xs">
                <Col xs={11}>
                  {media[currentIndex].location}
                  <time>{media[currentIndex].time}</time>
                </Col>
                <Col xs={1}>
                  <Icon icon="faEllipsisV" />
                </Col>
              </Row>
            </Grid>
          </header>
          <div className="video-container" onClick={() => {}}>
            <video ref={videoElem} onEnded={() => hideDrawer('media')}>
              <source src={'./video/' + media[currentIndex].file} type="video/mp4" />
            </video>
          </div>
        </main>
      ))} */}
    </main>
  );
};

const mapStateToProps = ({ media }) => ({ media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snap);
