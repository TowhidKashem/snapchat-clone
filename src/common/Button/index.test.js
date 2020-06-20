import React from 'react';
import { shallow } from 'enzyme';
import Icon from 'common/Icon';
import Button from './index';

describe('<Button />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Button />);
    expect(component.length).toBe(1);
  });

  it('text button', () => {
    const label = 'Hello World';
    const component = shallow(<Button label={label} />);
    expect(component.find('button').text()).toEqual(label);
  });

  it('image button', () => {
    const image = '/dev/null/img.png';
    const component = shallow(<Button image={image} />);
    expect(component.find('img').prop('src')).toEqual(image);
  });

  it('multiple icons button', () => {
    const icons = ['faCamera', 'faCompass'];
    const component = shallow(<Button icons={icons} />);
    expect(component.find(Icon)).toHaveLength(icons.length);
    component.find(Icon).forEach((icon, index) => {
      expect(icon.prop('icon')).toEqual(icons[index]);
    });
  });

  it('single icon button', () => {
    const icon = 'faCamera';
    const component = shallow(<Button icon={icon} />);
    expect(component.find(Icon)).toHaveLength(1);
    expect(component.find(Icon).prop('icon')).toEqual(icon);
  });
});
