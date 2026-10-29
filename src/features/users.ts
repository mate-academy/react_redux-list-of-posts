import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (_state, action: PayloadAction<User[]>) => action.payload,
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;
