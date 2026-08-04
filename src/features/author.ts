import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorStatus = {
  author: User | null;
};

const initialState: AuthorStatus = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return { ...state, author: action.payload };
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
