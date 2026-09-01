import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const initialState = {
  users: [] as User[],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
