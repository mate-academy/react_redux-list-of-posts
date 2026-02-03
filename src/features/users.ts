/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
const initialState: State = {
  users: [],
  loading: false,
  error: '',
};

type State = {
  users: User[];
  loading: boolean;
  error: string;
};
export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })

      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })

      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
