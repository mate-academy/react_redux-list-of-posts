import { User } from '../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorState = {
  author: User | null;
  loading: boolean;
  hasError: boolean;
};

const initialState: AuthorState = {
  author: null,
  loading: false,
  hasError: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
