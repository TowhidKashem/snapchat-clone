import { api } from 'utils/system';

// Action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_MESSAGE = 'SET_MESSAGE';

// Action creators
export const getMessages = (user) => async (dispatch) => {
  const [error, response] = await api.get(`/messages.json?thread=${user}`);

  if (!error) {
    dispatch({
      type: SET_MESSAGES,
      user,
      messages: response.messages
    });
  }
};

export const postMessage = (user, author, message) => (dispatch) =>
  dispatch({
    type: SET_MESSAGE,
    user,
    message: {
      thread: user,
      author,
      message,
      time: Date.now()
    }
  });

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
    default:
      return prevState;
  }
}
