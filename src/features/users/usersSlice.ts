import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (users, action: PayloadAction<User[]>) => {
      users.push(...action.payload);
    },
    clear: () => [],
  },
});

export const { set, clear } = usersSlice.actions;
export default usersSlice.reducer;
