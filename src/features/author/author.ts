/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type InitialState = {
  author: User | null;
  status:'idle' | 'failed' | 'pending' | 'fullfilled';
  error: string | null;
};

const initialState: InitialState = {
  author: null,
  status: 'idle',
  error: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
