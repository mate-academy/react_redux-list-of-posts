import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
