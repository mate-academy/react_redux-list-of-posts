/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

export interface AuthorState {
  data: User | null;
}

const initialState: AuthorState = {
  data: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
  },
});

export default authorSlice.reducer;

export const selectAuthor = (state: RootState) => state.author.data;

export const { setAuthor } = authorSlice.actions;
