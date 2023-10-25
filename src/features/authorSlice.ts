/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null as AuthorState;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export default authorSlice.reducer;
export const { setAuthor, clearAuthor } = authorSlice.actions;
