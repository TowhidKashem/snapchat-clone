import React from 'react';
import { shallow } from 'enzyme';
import { Gender } from 'features/User/types';
import Avatar from 'common/Avatar';
import PodUser from './index';

const defaultProps = {
  user: {
    id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
    username: 'Itzel50',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    gender: 'male' as Gender,
    age: 22,
    fullName: 'Josiane Keebler'
  }
};

describe('<PodUser />', () => {
  it('renders without crashing', () => {
    const component = shallow(<PodUser {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has avatar', () => {
    const component = shallow(<PodUser {...defaultProps} />);
    expect(component.find(Avatar).prop('src')).toBe(defaultProps.user.avatar);
  });

  it('has full name and username', () => {
    const component = shallow(<PodUser {...defaultProps} />);
    expect(component.find('header').text()).toBe(defaultProps.user.fullName);
    expect(component.find('span').text()).toBe(defaultProps.user.username);
  });
});
