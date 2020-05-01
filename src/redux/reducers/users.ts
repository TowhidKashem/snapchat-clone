import { GET_USERS } from 'redux/actions/actionTypes';

const initialState = {
  dummyUsers: []
};

const setUsers = (prevState, action) => ({
  ...prevState,
  dummyUsers: action.users
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return setUsers(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
