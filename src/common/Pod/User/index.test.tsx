import React from 'react';
import { shallow } from 'enzyme';
import Avatar from 'common/Avatar';
import User from './index';

const defaultProps = {
  user: {
    id: '00975694-7b26-4cdc-83d7-a6bdd783c987',
    username: 'Itzel50',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg',
    gender: 'male',
    age: 22,
    fullName: 'Josiane Keebler'
  }
};

describe('<User />', () => {
  it('renders without crashing', () => {
    const component = shallow(<User {...defaultProps} />);
    expect(component.length).toBe(1);
  });

  it('has avatar', () => {
    const component = shallow(<User {...defaultProps} />);
    expect(component.find(Avatar).prop('src')).toBe(defaultProps.user.avatar);
  });

  it('has full name and username', () => {
    const component = shallow(<User {...defaultProps} />);
    expect(component.find('header').text()).toBe(defaultProps.user.fullName);
    expect(component.find('span').text()).toBe(defaultProps.user.username);
  });
});
