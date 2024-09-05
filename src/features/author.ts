/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialState = {
  author: null | User;
};

const initialState: InitialState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const authorReducer = authorSlice.reducer;
export const { setUser } = authorSlice.actions;
