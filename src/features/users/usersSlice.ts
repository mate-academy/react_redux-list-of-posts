/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, () => {
        return {
          items: [],
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchUsers.fulfilled, (_state, action) => {
        return {
          items: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(fetchUsers.rejected, () => {
        return {
          items: [],
          loaded: true,
          hasError: true,
        };
      });
  },
});

export default usersSlice;
