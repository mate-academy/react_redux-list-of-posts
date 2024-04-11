import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = User | null;

const initialState: AuthorState = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
