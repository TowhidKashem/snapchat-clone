import { api } from 'utils';

// Action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_MESSAGE = 'SET_MESSAGE';

// Action creators
export const getMessages = (user) => async (dispatch) => {
  const [error, response] = await api.get(`/messages/thread/tk-${user}`);

  if (!error) {
    dispatch({
      type: SET_MESSAGES,
      user,
      messages: response
    });
  }
};

export const postMessage = (user, message) => async (dispatch) => {
  const [error, response] = await api.post(`/messages/thread/tk-${user}`, {
    thread: `tk-${user}`,
    author: 'TK',
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

// Reducer
export default function reducer(prevState = {}, { type, user, messages, message }) {
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
