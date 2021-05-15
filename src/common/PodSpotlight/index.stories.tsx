import React from 'react';
import PodSpotlight from './index';

export default {
  title: 'PodSpotlight',
  component: PodSpotlight
};

export const Default = () => (
  <PodSpotlight
    title="What a Lovely Day!"
    image="https://picsum.photos/id/1011/380/570"
  />
);
