import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import YouTube from 'react-youtube';
import styles from './index.module.scss';

interface Props {
  media: any;
  videoId: string;
  hideDrawer: (component: string) => void;
}

const videoOptions: any = {
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    controls: 0
  }
};

const Video: React.SFC<Props> = ({ media, hideDrawer }) => (
  <main className={styles.video}>
    <header>
      {media.video.location}
      <time>{media.video.time}</time>
    </header>
    <YouTube
      videoId={media.video.videoId}
      opts={videoOptions}
      className={styles.videoContainer}
      onEnd={() => hideDrawer('video')}
    />
  </main>
);

const mapStateToProps = ({ app, media }) => ({ app, media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
