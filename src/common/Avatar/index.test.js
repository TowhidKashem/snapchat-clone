import React from 'react';
import { shallow } from 'enzyme';
import Avatar, { sizeMap } from './index';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Avatar src="" />);
    expect(component.length).toBe(1);
  });

  it('can pass different sizes', () => {
    Object.keys(sizeMap).forEach((size) => {
      const component = shallow(<Avatar src="" size={size} />);
      expect(component.find('img').prop('width')).toEqual(sizeMap[size]);
    });
  });
});
