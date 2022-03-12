import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api, uuidv4 } from 'utils';
import { Loadable, loadable } from 'utils/loadable';
import { Message } from './data';

const initialState: {
  thread: string;
  messages: Loadable<Message[]>;
} = {
  thread: 'Lisa',
  messages: loadable
};

export const getMessages = createAsyncThunk(
  'chat/messagesReceived',
  async (user: string) => {
    const [error, response] = await api.get(`/messages.json?thread=${user}`);
    if (error) return false;
    return response.messages;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    postMessage: {
      reducer(
        state,
        action: PayloadAction<{
          id: string;
          author: string;
          message: string;
          time: string;
        }>
      ) {
        const { id, author, message, time } = action.payload;
        state.messages.data.push({
          id,
          author,
          message,
          time
        });
      },
      prepare(author: string, message: string) {
        return {
          payload: {
            id: uuidv4(),
            author,
            message,
            time: JSON.stringify(new Date())
          }
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, ({ messages }) => {
      messages.loading = true;
    });
    builder.addCase(getMessages.fulfilled, ({ messages }, { payload }) => {
      messages.loading = false;
      if (payload) {
        messages.data = payload;
      } else {
        messages.error = true;
      }
    });
    builder.addCase(getMessages.rejected, ({ messages }) => {
      messages.loading = false;
      messages.error = true;
    });
  }
});

export const { postMessage } = chatSlice.actions;

export default chatSlice.reducer;
