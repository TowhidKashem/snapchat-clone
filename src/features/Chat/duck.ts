// Action types
const SEND_MESSAGE = 'SEND_MESSAGE';

// Action creators
export const sendMessage = (user, message) => (dispatch) =>
  dispatch({
    type: SEND_MESSAGE,
    user,
    message
  });

// Reducer
const initialState = {
  messages: {
    julia: [
      {
        message: 'Hey there!',
        time: ''
      }
    ],
    tom: []
  }
};

export default function reducer(prevState = initialState, { type, user, message }) {
  switch (type) {
    case SEND_MESSAGE:
      return {
        ...prevState,
        messages: {
          ...prevState.messages,
          [user]: [
            ...prevState.messages[user],
            {
              message,
              time: Date.now()
            }
          ]
        }
      };
    default:
      return prevState;
  }
}
