import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_users, action: PayloadAction<User[]>) => action.payload,
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
