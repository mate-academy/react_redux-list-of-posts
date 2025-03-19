/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  // Export the state type
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;
