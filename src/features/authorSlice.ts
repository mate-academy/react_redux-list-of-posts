import { User } from '../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  author: null as User | null,
};

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
    clear: state => {
      return { ...state, author: null };
    },
  },
});
