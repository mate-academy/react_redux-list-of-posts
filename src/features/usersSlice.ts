import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  users: [] as User[],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loading: true };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return { ...state, users: action.payload, loading: false };
    });
    builder.addCase(init.rejected, state => {
      return { ...state, loading: false, error: 'Error' };
    });
  },
});
