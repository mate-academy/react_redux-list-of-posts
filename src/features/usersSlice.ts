import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface Users {
  users: User[];
  loaded: boolean;
  hasError: string;
}

const initialState: Users = {
  users: [],
  loaded: false,
  hasError: '',
};

export const usersAsync = createAsyncThunk('users/fetchUser', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersAsync.pending, state => ({
        ...state,
        loaded: true,
      }))
      .addCase(usersAsync.fulfilled, (state, action) => ({
        ...state,
        loaded: false,
        users: action.payload,
      }))
      .addCase(usersAsync.rejected, state => ({
        ...state,
        loade: false,
        hasError: 'Error',
      }));
  },
});

export default usersSlice.reducer;
