/* eslint-disable no-param-reassign */
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/getUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, (state: UserState) => {
        state.loading = false;
        state.error = 'Loading Users Error';
      });
  },
});

export const users = usersSlice.actions;
export default usersSlice.reducer;
