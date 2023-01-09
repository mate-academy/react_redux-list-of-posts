/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User [] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const getUsersList = createAsyncThunk(
  'users/getUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(getUsersList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
