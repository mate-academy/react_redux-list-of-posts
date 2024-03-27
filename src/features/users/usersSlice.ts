/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type InitialState = {
  value: User[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  value: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something with users went wrong!';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
