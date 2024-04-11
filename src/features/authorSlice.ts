import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
