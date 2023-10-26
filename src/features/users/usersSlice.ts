/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  currentUser: User | null;
};

const initialState: UsersState = {
  users: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setCurrentUser, setUsers } = userSlice.actions;
export const usersReducer = userSlice.reducer;
