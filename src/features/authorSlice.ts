/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<User | null>) => {
      return payload;
    },
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
