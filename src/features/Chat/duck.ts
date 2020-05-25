import { api } from 'utils';

// Action types
const SET_MESSAGES = 'SET_MESSAGES';
const POST_MESSAGE = 'POST_MESSAGE';

// Action creators
export const getMessages = (user) => async (dispatch) => {
  const [error, response] = await api.get(`/chats/${user}`);

  if (!error) {
    dispatch({
      type: SET_MESSAGES,
      user,
      messages: response.messages
    });
  }
};

export const postMessage = (user, message) => async (dispatch) => {
  const [error, response] = await api.post(`/chats/${user}`, {
    author: '',
    message,
    time: Date.now()
  });

  console.warn(response);

  // if (!error) {
  //   dispatch({
  //     type: POST_MESSAGE,
  //     user,
  //     messages: response.messages
  //   });
  // }
};

// Reducer
export default function reducer(prevState = {}, { type, user, messages }) {
  switch (type) {
    case SET_MESSAGES:
      return {
        ...prevState,
        [user]: [...messages]
      };
    case POST_MESSAGE:
      return {
        ...prevState,
        [user]: [...messages]
      };
    default:
      return prevState;
  }
}
