import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = User[];

const initialState = [] as UsersState;

export const fetchUsers = createAsyncThunk('users/fetchUsers', () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
