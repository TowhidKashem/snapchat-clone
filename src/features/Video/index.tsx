import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'redux/actions';
import YouTube from 'react-youtube';
import styles from './index.module.scss';

interface Props {
  media: any;
  videoId: string;
  hideDrawer: (component: string) => void;
}

const Video: React.SFC<Props> = ({ media, hideDrawer }) => {
  return (
    <main className={styles.video}>
      <header>
        {media.video.location}
        <time>{media.video.time}</time>
      </header>
      <YouTube
        videoId={media.video.videoId}
        opts={{ playerVars: { autoplay: 1 } }}
        onEnd={() => hideDrawer('video')}
      />
    </main>
  );
};

const mapStateToProps = ({ media }) => ({ media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(actions.hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
