import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getAuthor: (_, action) => action.payload,
  },
});

export default authorSlice.reducer;

export const { getAuthor } = authorSlice.actions;
