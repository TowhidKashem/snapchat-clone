import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { hideDrawer } from 'AppShell/AppShellStore';
import { language } from 'utils';
import Button from 'components/Button/Button';
import Section from 'components/Section/Section';
import MenuItem from 'components/MenuItem/MenuItem';
import Icon from 'components/Icon/Icon';
import Map from './Map/Map';
import { Logo } from './Logo.svg';
import './Account.scss';

const currentDate = new Date().toLocaleDateString(language, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const {
    session: { username }
  } = useSelector(({ user }: RootStateOrAny) => user);

  return (
    <main className="account">
      <header>
        <Button
          icon="faAngleDown"
          onClick={() => dispatch(hideDrawer('account'))}
          className="btn-close"
        />
        <Icon name="faCog" className="ico-gear" />
      </header>
      <div className="logo">
        <Logo />
        <strong>{username}</strong>
      </div>
      <Section header="Stories" transparent>
        <MenuItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
        <MenuItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to Our Story" />
      </Section>
      <Section header="Friends" transparent>
        <MenuItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
        <MenuItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
      </Section>
      <Section header="Bitmoji" transparent>
        <MenuItem leftIcon="faGrinBeam" rightIcon="faAngleRight" label="Create Bitmoji" />
      </Section>
      <Section header="Snap Map">
        <Map />
        <MenuItem
          leftIcon="faCompass"
          rightIcon="faAngleRight"
          label="Set a Status"
          straightEdge
        />
      </Section>
      <footer>
        <p>
          <a
            href="https://github.com/TowhidKashem/snapchat-clone"
            target="_blank"
            rel="noopener noreferrer"
            title="Github Repo"
          >
            <Icon name="faGithub" />
          </a>
          Joined SnapChat on {currentDate}
        </p>
      </footer>
    </main>
  );
};

export default Account;
