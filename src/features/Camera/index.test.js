import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from 'utils/test';
import reducer, { initialState } from 'AppShell/duck';
import Camera from './index';

describe('<Camera />', () => {
  test('can see loading screen when filter button is clicked', () => {
    const { container } = render(<Camera />, reducer, initialState);
    fireEvent.click(container.querySelector('.filter-dog'));
    expect(container.querySelector('.loading')).not.toBeNull();
  });

  describe('<PhotoCapture />', () => {
    window.HTMLCanvasElement.prototype.getContext = () => {};
    window.HTMLMediaElement.prototype.play = () => {};

    test('can take a photo', () => {
      const { container } = render(<Camera />, reducer, initialState);
      fireEvent.click(container.querySelector('.btn-capture'));
      expect(container.querySelector('.video-stream')).toHaveClass('hide');
      expect(container.querySelector('.photo-capture')).not.toHaveClass('hide');
    });

    test('can close out of photo overlay', () => {
      const { container } = render(<Camera />, reducer, initialState);
      fireEvent.click(screen.getByTestId('close-photo'));
      expect(container.querySelector('.video-stream')).not.toHaveClass('hide');
      expect(container.querySelector('.photo-capture')).toHaveClass('hide');
    });

    test('can download photo', () => {
      //
    });
  });
});
