import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getSelectedUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { getSelectedUser } = userSlice.actions;
