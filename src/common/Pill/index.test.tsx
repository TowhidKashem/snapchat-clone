import React from 'react';
import { shallow } from 'enzyme';
import Button from 'common/Button';
import Pill from './index';

const defaultProps = { icons: ['faPhoneAlt', 'faVideo'] };

describe('<Pill />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Pill {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has icon buttons', () => {
    const component = shallow(<Pill {...defaultProps} />);
    expect(component.find(Button).first().prop('icon')).toBe(defaultProps.icons[0]);
    expect(component.find(Button).last().prop('icon')).toBe(defaultProps.icons[1]);
  });
});
