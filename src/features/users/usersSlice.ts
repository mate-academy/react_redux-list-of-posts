import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
