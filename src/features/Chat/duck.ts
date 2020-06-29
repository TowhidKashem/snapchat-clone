import { api } from 'utils/system';

// Action types
const MESSAGES_RECEIVED = 'chat/messagesReceived';
const POST_MESSAGE = 'chat/postMessage';

// Action creators
export const getMessages = (user) => async (dispatch) => {
  const [error, response] = await api.get(`/messages.json?thread=${user}`);

  if (!error) {
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: response.messages
    });
  }
};

export const postMessage = (author, message) => (dispatch) =>
  dispatch({
    type: POST_MESSAGE,
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
    case MESSAGES_RECEIVED:
      return { ...prevState, messages };
    case POST_MESSAGE:
      return {
        ...prevState,
        messages: [...prevState.messages, message]
      };
    default:
      return prevState;
  }
}
