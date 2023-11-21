import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (_, action) => action.payload,
    clearAuthor: () => null,
  },
});

export default authorSlice.reducer;
export const { setAuthor, clearAuthor } = authorSlice.actions;
