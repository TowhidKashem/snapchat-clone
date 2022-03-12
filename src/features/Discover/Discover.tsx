import React, { useEffect, useState, useRef, RefObject } from 'react';
import { api, sleep, debounce, elemInView } from 'utils';
import Header from 'components/Header/Header';
import Section from 'components/Section/Section';
import Button from 'components/Button/Button';
import SkeletonFrame from 'components/SkeletonFrame/SkeletonFrame';
import Card from 'components/Card/Card';
import './Discover.scss';

type Profile = {
  image: string;
  title: string;
};

const Discover: React.FC<
  Readonly<{
    drawerContent: RefObject<HTMLElement>;
  }>
> = ({ drawerContent }) => {
  const loadMore = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    drawerContent.current?.addEventListener('scroll', onScroll.current);
  }, []);

  // Infinite scroll
  useEffect(() => {
    loadPage();
  }, [page]);

  const onScroll = useRef(
    debounce(() => {
      if (!isFetching.current && elemInView(loadMore)) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 10)
  );

  const loadPage = async () => {
    isFetching.current = true;

    const [error, response] = await api.get(`/discover/page/${page}.json`);

    if (!error) {
      // Simulate slow API response on the first call to show off skeleton frames
      if (page === 1) await sleep(1000);

      setProfiles((prevProfiles) => {
        return [...prevProfiles, ...response.discover];
      });

      isFetching.current = false;
    }

    if (page === 3) {
      drawerContent.current?.removeEventListener('scroll', onScroll.current);
    }
  };

  return (
    <main className="discover">
      <Header insideDrawer />

      <section className="view">
        <Section className="friends" header="Friends" transparent>
          <p>Stories from your friends will appear here.</p>
          <Button label="Add Friends" purple />
        </Section>
        <Section header="For You" transparent>
          <div className="inner">
            {profiles.length ? (
              profiles.map(({ image, title }) => (
                <Card key={image} image={image} title={title} testId="discover-item" />
              ))
            ) : (
              <SkeletonFrame count={10} />
            )}
          </div>
        </Section>

        <div ref={loadMore} className="load-more" />
      </section>
    </main>
  );
};

export default Discover;
