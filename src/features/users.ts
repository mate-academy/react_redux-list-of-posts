import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (
      _state: User[],
      action: PayloadAction<User[]>,
    ) => (action.payload),
  },
});

export const { setUsers } = userSlice.actions;
