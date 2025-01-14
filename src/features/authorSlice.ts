import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorSliceType = {
  author: User | null;
};

const initialState: AuthorSliceType = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAuthor(state, action: PayloadAction<User>) {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { addAuthor } = authorSlice.actions;

export default authorSlice.reducer;
