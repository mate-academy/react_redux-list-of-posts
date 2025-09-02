/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';
type UsersState = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: true,
  hasError: false,
};

export const usersFetch = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      usersFetch.fulfilled,
      (state: UsersState, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
        state.hasError = false;
      },
    );
    builder.addCase(usersFetch.pending, (state: UsersState) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(usersFetch.rejected, (state: UsersState) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
