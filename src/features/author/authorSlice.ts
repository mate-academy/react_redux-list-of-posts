/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = User | null;

const initialState = null as AuthorState;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<AuthorState>) => {
      return action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
