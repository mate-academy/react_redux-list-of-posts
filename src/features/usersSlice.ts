import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    set: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { actions, reducer } = usersSlice;
