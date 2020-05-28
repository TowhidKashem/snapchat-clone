//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Media as MediaType } from './types';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  media: MediaType[];
  hideDrawer: HideDrawer;
}

const Media: React.FC<Props> = ({ media, hideDrawer }) => {
  const videoElem = useRef<any>();
  const currentIndex = useState<number>(0);

  useEffect(() => {
    videoElem.current.load();
    videoElem.current.play();
  }, [media]);

  console.warn('mma', media);

  return (
    <main className="media">
      <header>
        <Grid fluid>
          <Row middle="xs">
            {/* <Col xs={11}>
              {media[currentIndex].location}
              <time>{media[currentIndex].time}</time>
            </Col> */}
            <Col xs={1}>
              <Icon icon="faEllipsisV" />
            </Col>
          </Row>
        </Grid>
      </header>
      <div className="video-container" onClick={() => {}}>
        {/* <video ref={videoElem} onEnded={() => hideDrawer('media')}>
          <source src={'./video/' + media[currentIndex].file} type="video/mp4" />
        </video> */}
      </div>
    </main>
  );
};

export default Media;
