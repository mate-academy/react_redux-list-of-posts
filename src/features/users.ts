import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = User[] | null;

const initialState = null as UsersState;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { set } = usersSlice.actions;
