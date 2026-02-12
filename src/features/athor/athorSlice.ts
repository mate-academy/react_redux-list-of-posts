/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

import { User } from '../../types/User';

export interface AuthorState {
  user: User | null;
}

const initialState: AuthorState = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,

  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    clearAuthor(state) {
      state.user = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author.user;

export default authorSlice.reducer;
