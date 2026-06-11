/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = {
  author: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
    },
    clearUser(state) {
      state.author = null;
    },
  },
});

export default authorSlice.reducer;
