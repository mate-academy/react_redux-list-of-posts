/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
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

export const getUsersFromServ = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clear: state => {
      state.users = [];
      state.error = '';
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersFromServ.pending, state => {
      state.loading = true;
    });

    builder.addCase(getUsersFromServ.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(getUsersFromServ.rejected, state => {
      state.loading = false;
      state.error = 'error';
    });
  },
});

export default usersSlice.reducer;
export const { clear } = usersSlice.actions;
