import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (users: User[], action: PayloadAction<User[]>) => {
      return action.payload.length ? action.payload : users;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
