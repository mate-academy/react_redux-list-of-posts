/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.hasError = false;
        state.loaded = true;
      })
      .addMatcher(
        (action: PayloadAction<string>) => action.type.endsWith('pending'),
        state => {
          state.hasError = false;
          state.loaded = false;
        },
      )
      .addMatcher(
        (action: PayloadAction<string>) => action.type.endsWith('rejected'),
        state => {
          state.hasError = true;
          state.loaded = true;
        },
      );
  },
});

export const usersReducer = usersSlice.reducer;
