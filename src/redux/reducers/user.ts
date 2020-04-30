import { LOGGED_IN } from 'redux/actions/actionTypes';

const initialState = {
  id: null,
  name: null,
  avatar: null,
  url: null,
  subscriptions: null
};

const setAuthData = (prevState, action) => ({
  ...prevState,
  id: action.user.id,
  name: action.user.name,
  avatar: action.user.avatar,
  url: action.user.url,
  subscriptions: action.user.subscriptions
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return setAuthData(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
