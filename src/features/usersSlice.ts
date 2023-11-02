/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { usersFetch } from '../thunks/usersThunk';

type UsersState = {
  users: User[];
  loading: boolean,
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(usersFetch.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(usersFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(usersFetch.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const userReducer = userSlice.reducer;
export const usersActions = userSlice.actions;
