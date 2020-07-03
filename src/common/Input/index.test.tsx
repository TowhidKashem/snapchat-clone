import React from 'react';
import { shallow } from 'enzyme';
import Input from 'common/Input';

const defaultProps = { placeholder: '' };

describe('<Input />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Input {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  describe('event handlers', () => {
    it('supports `onClick` handler', () => {
      const callback = jest.fn();
      const component = shallow(<Input {...defaultProps} onClick={callback} />);
      component.simulate('click');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('supports `onEnter` handler', () => {
      const callback = jest.fn();
      const component = shallow(<Input {...defaultProps} onEnter={callback} />);
      component.find('input[type="text"]').simulate('keypress', { key: 'Enter' });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('supports `onFocus`, `onBlur` and `onChange` handlers', () => {
      const handlers = {
        onFocus: jest.fn(),
        onBlur: jest.fn(),
        onChange: jest.fn()
      };
      const events = {
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
