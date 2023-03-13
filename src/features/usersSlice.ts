import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = User[];

const initialState: UsersState = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
