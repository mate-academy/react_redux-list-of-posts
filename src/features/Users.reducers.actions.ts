import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

/* eslint-disable no-param-reassign */

export interface UsersState {
  author: User | null;
  loaded: boolean;
  hasError: boolean;
  selectedUser: User | null;
  users: User[];
}

const initialState: UsersState = {
  selectedUser: null,
  author: null,
  loaded: false,
  hasError: false,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
