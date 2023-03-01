/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  usersData: User[];
  hasError: boolean
}

const initialState: UsersState = {
  usersData: [],
  hasError: false,
};

export const setUsersAsync = createAsyncThunk(
  'users/fetchUers',
  async () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUsersAsync.pending, (state) => {
        state.hasError = false;
      })
      .addCase(setUsersAsync.fulfilled, (state, action) => {
        state.usersData = action.payload;
      })
      .addCase(setUsersAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.usersData;

export default usersSlice.reducer;
