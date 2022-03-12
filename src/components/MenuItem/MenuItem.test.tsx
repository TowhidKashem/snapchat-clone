import React from 'react';
import { shallow, mount } from 'enzyme';
import Icon from 'components/Icon/Icon';
import Button from 'components/Button/Button';
import MenuItem from './MenuItem';

const defaultProps = {
  leftIcon: 'faCamera',
  rightIcon: 'faEllipsisV',
  label: 'Add to My Story'
};

describe('<MenuItem />', () => {
  it('renders without crashing', () => {
    const component = shallow(<MenuItem {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has text', () => {
    const component = mount(<MenuItem {...defaultProps} />);
    expect(component.text()).toBe(defaultProps.label);
  });

  it('has left and right icons', () => {
    const component = shallow(<MenuItem {...defaultProps} />);
    expect(component.find(Icon).prop('name')).toBe(defaultProps.leftIcon);
    expect(component.find(Button).prop('icon')).toBe(defaultProps.rightIcon);
  });
});
