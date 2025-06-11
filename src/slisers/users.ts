import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] | [] = [];

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (__state, action: PayloadAction<User[] | []>) => action.payload,
  },
});

export const { setUsers } = users.actions;
export default users.reducer;
