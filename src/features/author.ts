import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialAuthor: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
