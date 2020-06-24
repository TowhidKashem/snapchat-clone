import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import Header from 'common/Header';
import './index.scss';

interface Props {
  photos: any;
  photoTaken: boolean;
}

const Archive: React.FC<Props> = ({ photos, photoTaken }) => {
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
          {images.map((image) => (
            <img key={image} src={image} width={100} alt="" />
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
  showDrawer: (drawer) => dispatch(showDrawer(drawer))
});

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
