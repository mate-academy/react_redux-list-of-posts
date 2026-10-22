import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action) => action.payload,
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
