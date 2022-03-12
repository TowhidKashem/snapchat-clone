import React from 'react';
import { shallow, mount } from 'enzyme';
import Error from './Error';

describe('<Error />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Error />);
    expect(component.length).toBe(1);
  });

  it('can have message', () => {
    const message = 'Something went terribly wrong!';
    const component = mount(<Error message={message} />);
    expect(component.find('p').text().trim()).toBe(message);
  });
});
