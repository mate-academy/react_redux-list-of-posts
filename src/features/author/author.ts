import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState,

  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const authorActions = authorSlice.actions;
