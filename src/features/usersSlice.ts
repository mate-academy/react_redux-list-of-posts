import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (
      state, action: PayloadAction<User[]>,
    ) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addUsers } = usersSlice.actions;
export default usersSlice.reducer;
