import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from 'common/Button';
import Input from 'common/Input';
import Icon from 'common/Icon';
import Header from './index';

const defaultProps = { showDrawer: jest.fn() };

describe('<Header />', () => {
  it('renders without crashing', () => {
    const component = shallow(<Header {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('contains avatar/user icons and input field', () => {
    const component = shallow(<Header {...defaultProps} />);
    expect(component.find(Button).first().prop('buttonClass')).toEqual('btn-user');
    expect(component.find(Button).last().prop('buttonClass')).toEqual('btn-flip-camera');
    expect(component.find(Input)).toHaveLength(1);
  });

  it('contains avatar image', () => {
    const image = '/path/to/img.png';
    const component = mount(<Header {...defaultProps} avatar={image} />);
    expect(component.find('img').prop('src')).toEqual(image);
  });

  it("contains user icon if avatar prop isn't passed", () => {
    const component = mount(<Header {...defaultProps} />);
    expect(component.find(Icon).first().prop('icon')).toEqual('faUserCircle');
  });

  it('clicking avatar opens account drawer', () => {
    const component = mount(<Header {...defaultProps} />);
    component.find(Button).first().simulate('click');
    expect(defaultProps.showDrawer).toHaveBeenCalledWith({ component: 'account' });
  });

  it('clicking input field opens search drawer', () => {
    const component = mount(<Header {...defaultProps} />);
    component.find(Input).simulate('click');
    expect(defaultProps.showDrawer).toHaveBeenCalledWith(
      expect.objectContaining({ component: 'search' })
    );
  });
});
