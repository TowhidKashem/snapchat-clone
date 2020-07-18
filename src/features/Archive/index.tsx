import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDrawer } from 'AppShell/store';
import { addSnap } from 'features/Snap/store';
import Header from 'common/Header';
import Button from 'common/Button';
import Loader from 'common/Loader';
import Error from 'common/Error';
import './index.scss';

const Archive: React.FC = () => {
  const dispatch = useDispatch();
  const { photos, photoTaken } = useSelector(({ camera }) => ({
    photos: camera.photos,
    photoTaken: camera.photoTaken
  }));

  const openPhoto = (image) => {
    dispatch(
      addSnap({
        type: 'photo',
        url: image,
        shareable: true
      })
    );
    dispatch(
      showDrawer({
        component: 'snap',
        animationIn: 'zoomIn',
        animationOut: 'zoomOut',
        theme: 'dark'
      })
    );
  };

  return (
    <main className="archive">
      <Header insideDrawer />

      {photos.loading ? (
        <Loader nobg />
      ) : photos.error ? (
        <Error />
      ) : (
        <>
          <nav className="view-options">
            <Button label="Snaps" buttonClass="active" />
            <Button label="Camera Roll" />
          </nav>

          {!photoTaken && (
            <section className="message" data-test="placeholder-msg">
              <p>Take a photo and it will appear here!</p>
            </section>
          )}

          {photos.data.map(({ month, year, images }) => (
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
        </>
      )}
    </main>
  );
};

export default Archive;
