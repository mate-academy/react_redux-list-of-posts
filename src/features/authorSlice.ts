import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    changeAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { changeAuthor } = authorSlice.actions;

export default authorSlice.reducer;
