import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import { addSnap } from 'features/Snap/duck';
import { AddSnap } from 'features/Snap/types';
import { Photos } from 'features/Camera/types';
import Header from 'common/Header';
import Button from 'common/Button';
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
      url: image,
      shareable: true
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

      <nav className="view-options">
        <Button label="Snaps" buttonClass="active" />
        <Button label="Camera Roll" />
      </nav>

      {!photoTaken && (
        <section className="message" data-test="placeholder-msg">
          <p>Take a photo and it will appear here!</p>
        </section>
      )}

      {photos.map(({ month, year, images }) => (
        <section key={month} className="month" data-test="month">
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
              data-test="snap-image"
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
