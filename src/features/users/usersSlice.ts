/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface IUsers {
  listUsers: User[],
  selectUser: User | null
}

const initialState: IUsers = {
  listUsers: [],
  selectUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (
      state,
      action: PayloadAction<User[]>,
    ) => {
      state.listUsers = action.payload;
    },
    selectUser: (state, action:PayloadAction<User | null>) => {
      state.selectUser = action.payload;
    },
  },
});

export const { addUsers, selectUser } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
