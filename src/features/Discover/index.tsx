import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { api, sleep, debounce } from 'utils/system';
import { elemInView } from 'utils/viewport';
import { showDrawer } from 'AppShell/duck';
import { ShowDrawer } from 'AppShell/types';
import Header from 'common/Header';
import Widget from 'common/Widget';
import Button from 'common/Button';
import SkeletonFrame from 'common/SkeletonFrame';
import SpotlightPod from 'common/Pod/Spotlight';
import './index.scss';

interface Props {
  avatar: string;
  drawerContent: any;
  showDrawer: ShowDrawer;
}

type Profile = {
  image: string;
  title: string;
};

const Discover: React.FC<Props> = ({ avatar, drawerContent, showDrawer }) => {
  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const loadMore = useRef(null);
  const isFetching = useRef(false);
  const onScroll = useRef(
    debounce(() => {
      if (!isFetching.current && elemInView(loadMore.current))
        setPage((prevPage) => prevPage + 1);
    }, 10)
  );

  useEffect(() => {
    drawerContent.current.addEventListener('scroll', onScroll.current);
  }, [drawerContent]);

  useEffect(() => {
    (async () => {
      isFetching.current = true;
      const [error, response] = await api.get(`/discover/page/${page}.json`);
      if (!error) {
        // Simulate slow API response on the first call to show off skeleton frames
        if (page === 1) await sleep(1000);
        setProfiles((prevProfiles) => [...prevProfiles, ...response.discover]);
        isFetching.current = false;
      }
      if (page === 3)
        drawerContent.current.removeEventListener('scroll', onScroll.current);
    })();
  }, [page, drawerContent]);

  return (
    <main className="discover">
      <Header avatar={avatar} showDrawer={showDrawer} insideDrawer />
      <section className="view">
        <Widget className="friends" header="Friends" transparent>
          <p>Stories from your friends will appear here.</p>
          <Button label="Add Friends" purple />
        </Widget>
        <Widget header="For You" transparent>
          <div className="inner">
            {profiles.length ? (
              profiles.map(({ image, title }, index) => (
                <SpotlightPod
                  key={index}
                  image={image}
                  title={title}
                  testId="discover-item"
                />
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

const mapStateToProps = ({ user }) => ({ avatar: user.session.avatar });

const mapDispatchToProps = (dispatch) => ({
  showDrawer: (component) => dispatch(showDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
