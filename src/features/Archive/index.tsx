import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import { addSnap } from 'features/Snap/duck';
import { AddSnap } from 'features/Snap/types';
import { Photos } from 'features/Camera/types';
import Header from 'common/Header';
import './index.scss';

interface Props {
  photos: Photos;
  photoTaken: boolean;
  showDrawer: ShowDrawer;
  addSnap: AddSnap;
  avatar: string;
}

const Archive: React.FC<Props> = ({
  photos,
  photoTaken,
  showDrawer,
  addSnap,
  avatar
}) => {
  const openPhoto = (image) => {
    addSnap({
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
      <Header avatar={avatar} showDrawer={showDrawer} insideDrawer />

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

const mapStateToProps = ({ user, camera }) => ({
  photos: camera.photos,
  photoTaken: camera.photoTaken,
  avatar: user.session.avatar
});

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer)),
  addSnap: (snap) => dispatch(addSnap(snap))
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
