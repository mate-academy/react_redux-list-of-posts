import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = '';
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.error.message || '';
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const UsersActions = {
  ...usersSlice.actions,
  loadUsers,
};
