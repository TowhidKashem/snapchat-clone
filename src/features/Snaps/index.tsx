//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Media as MediaType } from './types';
import { HideDrawer } from 'AppShell/types';
import { hideDrawer } from 'AppShell/duck';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Icon from 'common/Icon';
import './index.scss';

import Media from './Media';

interface Props {
  media: MediaType[];
  hideDrawer: HideDrawer;
}

const Snaps: React.FC<Props> = ({ media, hideDrawer }) => {
  return (
    <main className="snaps">
      {snaps.map((snap) => (
        <Media media={snap} />
      ))}
    </main>
  );
};

const mapStateToProps = ({ media }) => ({ media });

const mapDispatchToProps = (dispatch) => ({
  hideDrawer: (component) => dispatch(hideDrawer(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snaps);
