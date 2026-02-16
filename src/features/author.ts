import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action) => action.payload,
  },
});

export default authorSlice.reducer;
