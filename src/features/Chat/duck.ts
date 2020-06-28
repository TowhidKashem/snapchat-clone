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
      messages: response.messages
    });
  }
};

export const postMessage = (author, message) => (dispatch) =>
  dispatch({
    type: SET_MESSAGE,
    message: {
      author,
      message,
      time: Date.now()
    }
  });

// Reducer
const initialState = {
  thread: 'Julia',
  messages: []
};

export default function reducer(prevState = initialState, { type, messages, message }) {
  switch (type) {
    case SET_MESSAGES:
      return {
        ...prevState,
        messages
      };
    case SET_MESSAGE:
      return {
        ...prevState,
        messages: [...prevState.messages, message]
      };
    default:
      return prevState;
  }
}
