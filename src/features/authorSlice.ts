import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: null as User | null,
  },
  reducers: {
    setAuthor(state, action: PayloadAction<User | null>) {
      return { ...state, author: action.payload };
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
