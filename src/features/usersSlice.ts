/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  status: Status;
  users: User[];
};

const initialState: UsersState = {
  status: 'idle',
  users: [],
};

export const setUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const result = await getUsers();

    return result;
  } catch (error) {
    throw error;
  }
});
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(setUsers.rejected, state => {
        state.status = 'failed';
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
