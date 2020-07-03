import React from 'react';
import Button from './index';

export default {
  title: 'Button',
  component: Button
};

export const Default = () => <Button label="Click Me" />;

export const Image = () => (
  <Button label="Click Me" image="https://picsum.photos/id/823/150/100" />
);

export const Icon = () => <Button icon="faUserCircle" />;

export const MultiIcon = () => <Button icons={['faMobile', 'faMobileAlt']} />;

export const Round = () => <Button icon="faCog" round />;

export const Purple = () => <Button label="Click Me" purple />;
