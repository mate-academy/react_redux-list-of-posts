/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface UserState {
  author: User | null;
}

const initialState: UserState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const selectedAuthor = (state: RootState) => state.author.author;

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
