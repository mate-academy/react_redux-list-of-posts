/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  users: User[],
  loaded: boolean,
  hasError: string,
};

const initialState: InitialState = {
  users: [],
  loaded: false,
  hasError: '',
};

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = 'Something went wrong';
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
