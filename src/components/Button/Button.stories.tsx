import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button
};

export const Default = () => <Button label="Click Me" />;

export const Image = () => <Button image="https://picsum.photos/id/823/150/100" />;

export const SvgImage = () => (
  <Button
    svg={
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z" />
      </svg>
    }
  />
);

export const Icon = () => <Button icon="faUserCircle" />;

export const MultiIcon = () => <Button icons={['faMobile', 'faMobileAlt']} />;

export const Round = () => <Button icon="faCog" round />;

export const Purple = () => <Button label="Click Me" purple />;
