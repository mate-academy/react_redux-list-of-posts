/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => state = action.payload,
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
