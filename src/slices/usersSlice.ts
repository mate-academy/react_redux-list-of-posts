import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialUsers: User[] = [];

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_state, action) => {
      return [...action.payload];
    });
  },
});

export default usersSlice.reducer;
export const actions = usersSlice.actions;
