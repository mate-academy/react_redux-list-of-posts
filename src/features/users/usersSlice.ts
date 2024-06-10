import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from './usersAPI';

type UsersState = {
  users: User[];
  loading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const initUsers = createAsyncThunk('users/fetch', () => fetchUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });
    builder.addCase(initUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });
    builder.addCase(initUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
