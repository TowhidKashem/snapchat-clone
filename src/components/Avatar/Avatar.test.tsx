import React from 'react';
import { shallow } from 'enzyme';
import Avatar, { sizeMap } from './Avatar';

const defaultProps = { src: '' };

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Avatar {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('loads img tag with the url as src', () => {
    const src = '/path/to/img.png';
    const component = shallow(<Avatar src={src} />);
    expect(component.find('img').prop('src')).toEqual(src);
  });

  it('can pass different sizes', () => {
    Object.keys(sizeMap).forEach((size) => {
      const component = shallow(<Avatar {...defaultProps} size={size} />);
      expect(component.find('img').prop('width')).toEqual(sizeMap[size]);
    });
  });
});
