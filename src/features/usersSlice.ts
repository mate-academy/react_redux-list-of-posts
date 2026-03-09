import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
/* eslint-disable no-param-reassign */

type InitialState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: '',
};

export const usersFetch = createAsyncThunk('users/fetch', () => getUsers());

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersFetch.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(usersFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(usersFetch.rejected, state => {
      state.loading = false;
      state.error = 'Fetch Users Error';
    });
  },
});

export default userSlice.reducer;
