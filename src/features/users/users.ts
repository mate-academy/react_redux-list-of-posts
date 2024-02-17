/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/usersFromServer';
import { User } from '../../types/User';

export const loadUsers = createAsyncThunk<User[]>(
  'users/load',
  getUsers,
);

const initialState = {
  users: [] as User[],
};

const u = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default u.reducer;
export const { setIsLoading } = u.actions;
