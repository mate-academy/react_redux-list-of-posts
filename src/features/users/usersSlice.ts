import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from './usersAPI';

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export default usersSlice.reducer;
