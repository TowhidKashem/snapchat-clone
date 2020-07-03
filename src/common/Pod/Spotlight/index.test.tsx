import React from 'react';
import { shallow } from 'enzyme';
import Spotlight from './index';

const defaultProps = {
  title: 'What a Lovely Day!',
  image: 'https://picsum.photos/id/1011/380/570'
};

describe('<Spotlight />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Spotlight {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has title', () => {
    const component = shallow(<Spotlight {...defaultProps} />);
    expect(component.find('header').text()).toBe(defaultProps.title);
  });

  it('has image', () => {
    const component = shallow(<Spotlight {...defaultProps} />);
    expect(component.find('img').prop('src')).toBe(defaultProps.image);
  });
});
