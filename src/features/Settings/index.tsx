import React from 'react';
import { connect } from 'react-redux';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  hideDrawer: HideDrawer;
}

const Settings: React.FC<Props> = ({ hideDrawer }) => {
  return (
    <div className="settings">
      <Icon icon="faAngleLeft" size="2x" onClick={() => hideDrawer('settings')} />
      // Settings
    </div>
  );
};

const mapStateToProps = ({ app }) => ({ app });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
