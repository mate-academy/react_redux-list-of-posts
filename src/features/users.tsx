import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_value, action: PayloadAction<User[]>) => action.payload,
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
