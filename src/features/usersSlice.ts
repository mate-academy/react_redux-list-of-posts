import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
