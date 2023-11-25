import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
