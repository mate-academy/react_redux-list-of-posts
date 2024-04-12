/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  author: User | null;
};

const initialState: InitialState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
