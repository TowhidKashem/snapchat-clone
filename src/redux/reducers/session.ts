import { GET_USER } from 'redux/actions/actionTypes';

const initialState = {
  user: {
    username: '',
    avatar: null
  }
};

const setUser = (prevState, action) => ({
  ...prevState,
  user: action.user
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return setUser(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
