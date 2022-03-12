import React from 'react';
import { shallow } from 'enzyme';
import Icon from 'components/Icon/Icon';
import Input from './Input';

const defaultProps = { placeholder: 'Type here...' };

describe('<Input />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Input {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has placeholder', () => {
    const component = shallow(<Input {...defaultProps} />);
    expect(component.find('input[type="text"]').prop('placeholder')).toEqual(
      defaultProps.placeholder
    );
  });

  it('has default value', () => {
    const value = 'hello';
    const component = shallow(<Input {...defaultProps} value={value} />);
    expect(component.find('input[type="text"]').prop('value')).toEqual(value);
  });

  it('has left and right icons', () => {
    const icons = {
      left: 'faSearch',
      right: 'faUserPlus'
    };
    const component = shallow(
      <Input {...defaultProps} leftIcon={icons.left} rightIcon={icons.right} />
    );
    expect(component.find(Icon).first().prop('name')).toEqual(icons.left);
    expect(component.find(Icon).last().prop('name')).toEqual(icons.right);
  });

  it('supports expand animation', () => {
    const component = shallow(<Input {...defaultProps} animate />);
    expect(component.hasClass('animate')).toBe(true);
  });

  describe('event handlers', () => {
    it('supports `onClick` handler', () => {
      const callback = jest.fn();
      const component = shallow(<Input {...defaultProps} onClick={callback} />);
      component.find('.disabled-overlay').simulate('click');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('supports `onEnter` handler', () => {
      const callback = jest.fn();
      const component = shallow(<Input {...defaultProps} onEnter={callback} />);
      component.find('input[type="text"]').simulate('keypress', { key: 'Enter' });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('supports `onFocus`, `onBlur` and `onChange` handlers', () => {
      const handlers: Record<string, jest.Mock> = {
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        onChange: jest.fn()
      };
      const events: Record<string, string> = {
        onFocus: 'focus',
        onBlur: 'blur',
        onChange: 'change'
      };
      for (let i in handlers) {
        const prop = { [i]: handlers[i] };
        const component = shallow(<Input {...defaultProps} {...prop} />);
        component.find('input[type="text"]').simulate(events[i]);
        expect(handlers[i]).toHaveBeenCalledTimes(1);
      }
    });
  });
});
