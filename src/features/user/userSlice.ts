/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type InitialStateType = {
  users: User[];
  loading: boolean;
  fetchError: boolean;
};

const initialState: InitialStateType = {
  users: [],
  loading: false,
  fetchError: false,
};

export const init = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.rejected, state => {
        state.fetchError = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;
