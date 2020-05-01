import { GET_USERS } from 'redux/actions/actionTypes';

export const getUsers = () => async (dispatch) => {
  const response = await fetch('https://randomuser.me/api/?results=3');
  const users = await response.json();
  dispatch({
    type: GET_USERS,
    users
  });
};
