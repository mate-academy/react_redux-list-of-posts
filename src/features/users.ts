import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_, { payload }: PayloadAction<User[]>) => [...payload],
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
