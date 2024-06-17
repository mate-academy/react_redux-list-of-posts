import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
/* eslint-disable no-param-reassign */

type State = {
  data: User[];
  isLoading: boolean;
  errorMessage: string;
};

const initialState: State = {
  data: [],
  isLoading: false,
  errorMessage: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.isLoading = false;
      state.errorMessage = 'Something went wrong';
    });
  },
});

export default usersSlice.reducer;
