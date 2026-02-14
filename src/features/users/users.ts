/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { loadUsers } from './userAsyncActions';

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
