/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  author: User | null;
}

const initialState: UsersState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clearAuthor: (state) => {
      state.author = null;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;
export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
