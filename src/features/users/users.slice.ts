/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { loadUsers } from './actions';

export interface UsersState {
  users: User[];
  isLoading: boolean;
  errorMessage: string;
}

const initialState: UsersState = {
  users: [],
  isLoading: true,
  errorMessage: '',
};

const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload as string;
    });
  },
});

export { actions, reducer };
