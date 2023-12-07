/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import type { RootState } from '../../app/store';

export interface AuthorState {
  value: User | null;
}

const initialState: AuthorState = {
  value: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.value;

export default authorSlice.reducer;
