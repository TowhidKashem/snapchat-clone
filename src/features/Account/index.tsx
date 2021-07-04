import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { hideDrawer } from 'AppShell/store';
import { language } from 'utils';
import Button from 'common/Button';
import Widget from 'common/Widget';
import PodActionItem from 'common/PodActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import './index.scss';

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
          onclick={() => dispatch(hideDrawer('account'))}
          buttonClass="btn-close"
        />
        <Icon icon="faCog" className="ico-gear" />
      </header>
      <div className="logo">
        <img src="./images/logo.svg" alt="" />
        <strong>{username}</strong>
      </div>
      <Widget header="Stories" transparent>
        <PodActionItem
          leftIcon="faCamera"
          rightIcon="faEllipsisV"
          label="Add to My Story"
        />
        <PodActionItem
          leftIcon="faCamera"
          rightIcon="faEllipsisV"
          label="Add to Our Story"
        />
      </Widget>
      <Widget header="Friends" transparent>
        <PodActionItem
          leftIcon="faUserPlus"
          rightIcon="faAngleRight"
          label="Add Friends"
        />
        <PodActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
      </Widget>
      <Widget header="Bitmoji" transparent>
        <PodActionItem
          leftIcon="faGrinBeam"
          rightIcon="faAngleRight"
          label="Create Bitmoji"
        />
      </Widget>
      <Widget header="Snap Map">
        <Map />
        <PodActionItem
          leftIcon="faCompass"
          rightIcon="faAngleRight"
          label="Set a Status"
          straightEdge
        />
      </Widget>
      <footer>
        <p>
          <a
            href="https://github.com/TowhidKashem/snapchat-clone"
            target="_blank"
            rel="noopener noreferrer"
            title="Github Repo"
          >
            <Icon icon="faGithub" />
          </a>
          Joined SnapChat on {currentDate}
        </p>
      </footer>
    </main>
  );
};

export default Account;
