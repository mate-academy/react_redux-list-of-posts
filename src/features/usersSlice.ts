import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const setUsers = createAsyncThunk('users/feth', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
    }));
  },
});

export const usersActons = usersSlice.actions;
