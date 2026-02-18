/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserState = {
  author: User | null;
  loaded: boolean;
  hasError: boolean;
};

export const initialState: UserState = {
  author: null,
  loaded: false,
  hasError: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
