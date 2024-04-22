import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });
    builder.addCase(initUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
    builder.addCase(initUsers.rejected, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload as string;
    });
  },
});

export default usersSlice.reducer;
