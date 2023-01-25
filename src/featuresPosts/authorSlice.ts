import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
/* eslint-disable no-param-reassign */

export interface AuthorState {
  author: User | null,
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    add: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { add } = authorSlice.actions;

export default authorSlice.reducer;
