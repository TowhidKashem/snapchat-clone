import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import { openSnap } from 'features/Snap/duck';
import { OpenSnap } from 'features/Snap/types';

import Header from 'common/Header';
import './index.scss';

interface Props {
  photos: any;
  photoTaken: boolean;
  showDrawer: ShowDrawer;
  openSnap: OpenSnap;
}

const Archive: React.FC<Props> = ({ photos, photoTaken, showDrawer, openSnap }) => {
  const openPhoto = (image) => {
    openSnap({
      type: 'photo',
      url: image
    });
    showDrawer({
      component: 'snap',
      animationIn: 'zoomIn',
      animationOut: 'zoomOut',
      theme: 'dark'
    });
  };

  return (
    <main className="archive">
      <Header showDrawer={showDrawer} />

      {!photoTaken && (
        <section className="message">
          <p>Take a photo and it will appear here!</p>
        </section>
      )}

      {photos.map(({ month, year, images }) => (
        <section key={month} className="month">
          <h3>
            {month} {year}
          </h3>
          {images.map((image, index) => (
            <img
              key={image + index}
              src={image}
              width={100}
              alt=""
              onClick={() => openPhoto(image)}
            />
          ))}
        </section>
      ))}
    </main>
  );
};

const mapStateToProps = ({ camera }) => ({
  photos: camera.photos,
  photoTaken: camera.photoTaken
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  openSnap: (snap) => dispatch(openSnap(snap))
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
