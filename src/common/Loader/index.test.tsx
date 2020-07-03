import React from 'react';
import { shallow } from 'enzyme';
import Loader from './index';

describe('<Loader />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Loader />);
    expect(component.length).toBe(1);
  });

  it('can have message', () => {
    const message = 'Something is loading..';
    const component = shallow(<Loader message={message} />);
    expect(component.find('span').text()).toBe(message);
  });
});
