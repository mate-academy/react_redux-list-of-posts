/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  user: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    clearAuthor(state) {
      state.user = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;

export default authorSlice.reducer;
