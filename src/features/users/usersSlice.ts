/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'users' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'users',
};

export const uploadUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadUsers.fulfilled, (state, action) => {
        state.status = 'users';
        state.users = action.payload;
      })
      .addCase(uploadUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
