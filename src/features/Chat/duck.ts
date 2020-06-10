import { api } from 'utils';

// Action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_THREAD = 'SET_THREAD';

// Action creators
export const getMessages = (user) => async (dispatch) => {
  const [error, response] = await api.get('/messages/thread/' + user);

  if (!error) {
    dispatch({
      type: SET_MESSAGES,
      user,
      messages: response
    });
  }
};

export const postMessage = (user, author, message) => async (dispatch) => {
  const [error, response] = await api.post('/messages/thread/' + user, {
    thread: user,
    author,
    message,
    time: Date.now()
  });

  if (!error) {
    dispatch({
      type: SET_MESSAGE,
      user,
      message: response
    });
  }
};

export const switchThread = (user) => async (dispatch) =>
  dispatch({ type: SET_THREAD, user });

// Reducer
const initialState = {
  activeThread: 'julia'
};

export default function reducer(
  prevState = initialState,
  { type, user, messages, message }
) {
  switch (type) {
    case SET_MESSAGES:
      return {
        ...prevState,
        [user]: [...messages]
      };
    case SET_MESSAGE:
      return {
        ...prevState,
        [user]: [...prevState[user], message]
      };
    case SET_THREAD:
      return {
        ...prevState,
        activeThread: user
      };
    default:
      return prevState;
  }
}
