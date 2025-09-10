/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    get: (state, actions: PayloadAction<User[]>) => {
      return { ...state, users: actions.payload };
    },
  },
});

export default usersSlice.reducer;
