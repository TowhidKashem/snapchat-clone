import React from 'react';
import { shallow } from 'enzyme';
import Widget from './index';

const defaultProps = { header: 'Hello World' };

describe('<SkeletonFrame />', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <Widget {...defaultProps}>
        <></>
      </Widget>
    );
    expect(component.length).toBe(1);
  });

  it('shows header', () => {
    const component = shallow(
      <Widget header={defaultProps.header}>
        <></>
      </Widget>
    );
    expect(component.find('header').text()).toBe(defaultProps.header);
  });

  it('shows content', () => {
    const text = 'Some content here..';
    const component = shallow(
      <Widget {...defaultProps}>
        <p>{text}</p>
      </Widget>
    );
    expect(component.find('.inner-content p').length).toBe(1);
    expect(component.find('.inner-content p').text()).toBe(text);
  });
});
