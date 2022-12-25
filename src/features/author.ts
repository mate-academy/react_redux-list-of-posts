import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as AuthorState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
