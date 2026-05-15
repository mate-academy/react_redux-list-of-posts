/* eslint-disable no-param-reassign */
import { User } from '../types/User';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  author: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, { payload }: PayloadAction<User | null>) {
      state.author = payload;
    },
  },
});
