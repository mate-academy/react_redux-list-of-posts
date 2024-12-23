import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
