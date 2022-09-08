/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  selectedUserId: number | null;
  usersIsLoading: boolean;
  usersIsError: boolean;
};

const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  usersIsLoading: false,
  usersIsError: false,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch_users',
  getUsers,
);

export const usersStateSlice = createSlice({
  name: 'usersState',
  initialState,
  reducers: {
    selectUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.usersIsLoading = true;
      state.usersIsError = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersIsLoading = false;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.usersIsError = true;
      state.usersIsLoading = false;
    });
  },
});

export const usersStateReducer = usersStateSlice.reducer;
export const { selectUserId } = usersStateSlice.actions;
