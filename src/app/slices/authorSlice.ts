/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = {
  author: null as User | null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action) {
      state.author = action.payload;
    },
  },
});

const { actions, reducer } = authorSlice;

export default reducer;
export const { setAuthor } = actions;
