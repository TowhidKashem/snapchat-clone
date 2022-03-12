import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { showDrawer } from 'AppShell/AppShellStore';
import { addSnap } from 'features/Snap/SnapStore';
import { Photo } from 'features/Camera/data';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';
import './Archive.scss';

const Archive: React.FC = () => {
  const dispatch = useDispatch();
  const { photos, photoTaken } = useSelector(({ camera }: RootStateOrAny) => camera);

  const openPhoto = (image: string) => {
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
            <Button label="Snaps" className="active" />
            <Button label="Camera Roll" />
          </nav>

          {!photoTaken && (
            <section className="message" data-test="placeholder-msg">
              <p>Take a photo and it will appear here!</p>
            </section>
          )}

          {photos.data.map(({ month, year, images }: Photo, index: number) => (
            <section key={month + index} className="month" data-test="month">
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
