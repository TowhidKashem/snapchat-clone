import React from 'react';
import { shallow } from 'enzyme';
import SkeletonFrame from './SkeletonFrame';

describe('<SkeletonFrame />', () => {
  it('renders without crashing', () => {
    const component = shallow(<SkeletonFrame />);
    expect(component.length).toBe(1);
  });

  it('can load multiple frames', () => {
    const component = shallow(<SkeletonFrame count={3} />);
    expect(component.find('.skeleton-frame').length).toBe(3);
  });
});
