/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk(
  'users/fetch', () => {
    return getUsers();
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
    builder
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'failed';
      });
  },
});

export default userSlice.reducer;
