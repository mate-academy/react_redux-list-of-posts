/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

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
    selectAuthor: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;
export default authorSlice.reducer;
