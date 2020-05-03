import { GET_USER } from 'redux/actions/actionTypes';
import { User } from 'types';

export const getUser = () => async (dispatch) => {
  // Mock API request
  const response = await new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        username: 'marik88',
        avatar: ''
      });
    }, 100)
  );
  dispatch({
    type: GET_USER,
    user: response
  });
};
