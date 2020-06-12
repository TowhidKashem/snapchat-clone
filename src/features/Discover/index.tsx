import React from 'react';
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
      <Widget className="friends" header="Friends" transparent>
        <p>Stories from your friends will appear here.</p>
        <Button label="Add Friends" purple />
      </Widget>
      <Widget header="For You" transparent>
        <div className="inner">
          {profiles.map(({ image, title, time }) => (
            <SpotlightPod image={image} title={title} time={time} />
          ))}
        </div>
      </Widget>
    </main>
  );
};

export default Discover;
