/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorSlice {
  author: User | null;
}

const initialState: AuthorSlice = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },

});

export const { selectAuthor } = authorSlice.actions;

export default authorSlice.reducer;
