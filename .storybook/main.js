// import { addDecorator } from '@storybook/react';
// import centered from '@storybook/addon-centered';

// addDecorator(centered);

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register'
    // '@storybook/addon-centered'
  ]
};
