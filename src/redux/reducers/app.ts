import { LOAD_MENU } from 'redux/actions/actionTypes';

const initialState = {
  drawer: ''
};

const setMessage = (prevState, action) => ({
  ...prevState,
  drawer: action.component
});

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOAD_MENU:
      return setMessage(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
