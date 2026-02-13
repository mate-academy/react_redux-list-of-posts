/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: {
  usersList: User[];
  isLoading: boolean;
  hasError: string;
} = {
  usersList: [],
  isLoading: false,
  hasError: '',
};

export const loadUsers = createAsyncThunk(`users/fetch`, async () => {
  return getUsers() as Promise<User[]>;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.usersList = action.payload;
    },

    clearUsers(state) {
      state.usersList = [];
    },
  },

  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(loadUsers.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.isLoading = false;
    });
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
