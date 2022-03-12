import React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';

const defaultProps = { header: 'Hello World' };

describe('<Section />', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <Section {...defaultProps}>
        <></>
      </Section>
    );
    expect(component.length).toBe(1);
  });

  it('shows header', () => {
    const component = shallow(
      <Section header={defaultProps.header}>
        <></>
      </Section>
    );
    expect(component.find('header').text()).toBe(defaultProps.header);
  });

  it('shows content', () => {
    const text = 'Some content here..';
    const component = shallow(
      <Section {...defaultProps}>
        <p>{text}</p>
      </Section>
    );
    expect(component.find('.inner-content p').length).toBe(1);
    expect(component.find('.inner-content p').text()).toBe(text);
  });
});
