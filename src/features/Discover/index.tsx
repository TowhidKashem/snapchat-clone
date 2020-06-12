import React from 'react';
import { connect } from 'react-redux';
import { showDrawer } from 'AppShell/duck';
import Header from 'common/Header';
import Widget from 'common/Widget';
import Button from 'common/Button';
import SpotlightPod from 'common/Pod/Spotlight';
import './index.scss';

const Discover = () => {
  const profiles = [
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    },
    {
      image: 'https://www.refinery29.com/file/11154/intro-hero-mobile-v2.jpg',
      title: 'No One Can Keep Up With Her',
      time: '20h ago'
    }
  ];

  return (
    <main className="discover">
      <Header showDrawer={showDrawer} />
      <section className="view">
        <Widget className="friends" header="Friends" transparent>
          <p>Stories from your friends will appear here.</p>
          <Button label="Add Friends" purple />
        </Widget>
        <Widget header="For You" transparent>
          <div className="inner">
            {profiles.map(({ image, title, time }, index) => (
              <SpotlightPod key={index} image={image} title={title} time={time} />
            ))}
          </div>
        </Widget>
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (drawer) => dispatch(showDrawer(drawer))
});

export default connect(null, mapDispatchToProps)(Discover);
