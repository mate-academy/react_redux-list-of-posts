import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User | null = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_state, action) => {
      return action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
