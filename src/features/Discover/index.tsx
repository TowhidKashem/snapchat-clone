import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { api } from 'utils/api';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import Header from 'common/Header';
import Widget from 'common/Widget';
import Button from 'common/Button';
import SpotlightPod from 'common/Pod/Spotlight';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const Discover: React.FC<Props> = ({ showDrawer }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => {
      const [error, response] = await api.get('/discover.json');
      if (!error) setProfiles(response.discover);
    })();
  }, []);

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
  showDrawer: (component) => dispatch(showDrawer(component))
});

export default connect(null, mapDispatchToProps)(Discover);
