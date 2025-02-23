import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, actions) => actions.payload,
  },
});

export const authorReducer = authorSlice.reducer;
