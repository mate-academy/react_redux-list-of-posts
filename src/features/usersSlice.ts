import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type UsersState = {
  users: User[];
  loading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
