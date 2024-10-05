import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

const initialState = null as User | null;

export const { reducer, actions } = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export const authorSelector = (state: RootState) => state.author;
