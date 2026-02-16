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

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = 'Error';
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    });
  },
});

export const { actions } = usersSlice;
