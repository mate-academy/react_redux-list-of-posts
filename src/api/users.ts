import { User } from '../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
    }));
  },
});

export default usersSlice.reducer;
