import React from 'react';
import { shallow } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon, { iconMap } from './index';

const defaultProps = { icon: 'faSnapchatSquare' };

describe('<Icon />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Icon {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('loads fontawesome icon', () => {
    const component = shallow(<Icon {...defaultProps} />);
    expect(component.find(FontAwesomeIcon).prop('icon')).toEqual(
      iconMap[defaultProps.icon]
    );
  });

  it('supports click handler', () => {
    const callback = jest.fn();
    const component = shallow(<Icon {...defaultProps} onClick={callback} />);
    component.simulate('click');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
