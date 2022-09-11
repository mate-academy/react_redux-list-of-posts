import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[],
  isloading: boolean,
  error: string,
  selectedUserId: number | null,
}

const initialState: UsersState = {
  users: [],
  isloading: false,
  error: '',
  selectedUserId: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  getUsers,
);

/* eslint-disable no-param-reassign */

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectUserId(state, action) {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isloading = false;
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.isloading = false;
    });
  },
});

export const selectors = {
  getSelectedUser: (state: UsersState) => state.users.find(
    ({ id }) => id === state.selectedUserId,
  ) || null,

  getUsers: (state: UsersState) => state.users,
};

export default usersSlice.reducer;
export const { setSelectUserId } = usersSlice.actions;
