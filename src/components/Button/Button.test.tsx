import React from 'react';
import { shallow } from 'enzyme';
import Icon from 'components/Icon/Icon';
import Button from './Button';

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
    const image = '/path/to/img.png';
    const component = shallow(<Button image={image} />);
    expect(component.find('img').prop('src')).toEqual(image);
  });

  it('single icon button', () => {
    const icon = 'faCamera';
    const component = shallow(<Button icon={icon} />);
    expect(component.find(Icon)).toHaveLength(1);
    expect(component.find(Icon).prop('name')).toEqual(icon);
  });

  it('multiple icons button', () => {
    const icons = ['faCamera', 'faCompass'];
    const component = shallow(<Button icons={icons} />);
    expect(component.find(Icon)).toHaveLength(icons.length);
    component.find(Icon).forEach((icon, index) => {
      expect(icon.prop('name')).toEqual(icons[index]);
    });
  });

  it('`purple`, `round` and `plain` buttons', () => {
    ['purple', 'round', 'plain'].forEach((type) => {
      const prop = { [type]: true };
      const component = shallow(<Button {...prop} />);
      expect(component.find('button').hasClass(type)).toBe(true);
    });
  });

  it('supports click handler', () => {
    const callback = jest.fn();
    const component = shallow(<Button onClick={callback} />);
    component.simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
