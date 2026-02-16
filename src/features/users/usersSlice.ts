/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { setUsers } = usersSlice.actions;
