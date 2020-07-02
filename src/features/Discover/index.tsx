import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { api, sleep, debounce } from 'utils/system';
import { elemInView } from 'utils/browser';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import Header from 'common/Header';
import Widget from 'common/Widget';
import Button from 'common/Button';
import SkeletonFrame from 'common/SkeletonFrame';
import SpotlightPod from 'common/Pod/Spotlight';
import './index.scss';

interface Props {
  showDrawer: ShowDrawer;
}

const Discover: React.FC<Props> = ({ showDrawer }) => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const loadMore = useRef(null);
  const isFetching = useRef(false);

  useEffect(() => {
    (async () => {
      if (page > 3) return;
      isFetching.current = true;
      const [error, response] = await api.get(`/discover/page/${page}.json`);
      if (!error) {
        // Simulate slow API response on the first call to show off skeleton frames
        if (page === 1) await sleep(1000);
        setProfiles((prevProfiles) => [...prevProfiles, ...response.discover]);
        isFetching.current = false;
      }
    })();
  }, [page]);

  useEffect(() => {
    document.querySelector('#discover .content')?.addEventListener(
      'scroll',
      debounce(() => {
        if (!isFetching.current && elemInView(loadMore.current))
          setPage((prevPage) => prevPage + 1);
      }, 10)
    );
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
            {profiles.length ? (
              profiles.map(({ image, title }, index) => (
                <SpotlightPod key={index} image={image} title={title} />
              ))
            ) : (
              <SkeletonFrame count={10} />
            )}
          </div>
        </Widget>
        <div ref={loadMore} className="load-more"></div>
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component))
});

export default connect(null, mapDispatchToProps)(Discover);
