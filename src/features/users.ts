import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type UserState = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: UserState = {
  users: [],
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchUsers.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export default userSlice.reducer;
