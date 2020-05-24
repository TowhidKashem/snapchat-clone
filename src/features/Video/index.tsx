import React from 'react';
import { connect } from 'react-redux';
import { HideDrawer } from 'AppShell/Drawer/types';
import { hideDrawer } from 'AppShell/duck';
import YouTube from 'react-youtube';
import './index.scss';

interface Props {
  media: any;
  videoId: string;
  hideDrawer: HideDrawer;
}

const videoOptions: any = {
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
    controls: 0
  }
};

const Video: React.FC<Props> = ({ media, hideDrawer }) => (
  <main className="video">
    <button onClick={() => hideDrawer('video')} style={{ color: '#fff' }}>
      Close
    </button>

    <header>
      {media.video.location}
      <time>{media.video.time}</time>
    </header>
    <YouTube
      videoId={media.video.videoId}
      opts={videoOptions}
      className="video-container"
      onEnd={() => hideDrawer('video')}
    />
  </main>
);

const mapStateToProps = ({ app, media }) => ({ app, media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
