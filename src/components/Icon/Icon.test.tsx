import React from 'react';
import { shallow } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon, { iconMap } from './Icon';

const defaultProps = {
  name: 'faSnapchatSquare',
  className: 'abc'
};

describe('<Icon />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Icon {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('loads fontawesome icon', () => {
    const component = shallow(<Icon {...defaultProps} />);
    expect(component.find(FontAwesomeIcon).prop('icon')).toEqual(
      iconMap[defaultProps.name]
    );
  });

  it('can add custom class name', () => {
    const component = shallow(<Icon {...defaultProps} />);
    expect(component.find(FontAwesomeIcon).prop('className')).toContain(
      defaultProps.className
    );
  });
});
