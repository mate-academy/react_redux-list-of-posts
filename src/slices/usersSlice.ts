import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  loaded: boolean,
  hasError: boolean,
  users: User[],
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
