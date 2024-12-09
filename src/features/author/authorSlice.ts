/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

type State = {
  author: User | null;
};

const initialState: State = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, { payload }: PayloadAction<User | null>) => {
      state.author = payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author;

export default authorSlice.reducer;
