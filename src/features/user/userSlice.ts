/* eslint-disable no-param-reassign */
import { User } from '../../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  users: [] as User[],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = '';
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailed } =
  usersSlice.actions;
export default usersSlice.reducer;
