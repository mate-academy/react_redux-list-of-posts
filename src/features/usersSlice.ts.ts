import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_users, action: PayloadAction<User[]>) => action.payload,
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
