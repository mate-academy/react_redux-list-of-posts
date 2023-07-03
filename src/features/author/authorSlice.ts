/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorInfo = {
  author: User | null;
};

const initialState: AuthorInfo = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state: AuthorInfo, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
