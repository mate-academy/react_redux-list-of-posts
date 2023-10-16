import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
