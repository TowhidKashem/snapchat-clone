import { LOGGED_IN } from 'redux/actions/actionTypes';

export const autoLogin = () => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      accessToken: 'authCookie.accessToken',
      refreshToken: 'authCookie.refreshToken',
      expiresIn: 'authCookie.expiresIn',
      user: 'authCookie.user'
    });
  };
};
