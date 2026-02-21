/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const { actions } = usersSlice;
