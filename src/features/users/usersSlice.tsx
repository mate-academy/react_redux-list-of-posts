/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { setUsers } from './usersAPI';

export interface UsersState {
  users: User[],
  isLoading: boolean,
  error: boolean,
}

export const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.isLoading = true;
        state.users = action.payload;
      })
      .addCase(setUsers.rejected, (state) => {
        state.isLoading = true;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
