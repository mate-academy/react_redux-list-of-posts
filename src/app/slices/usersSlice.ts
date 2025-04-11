/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
  },
});

const { actions, reducer } = usersSlice;

export default reducer;
export const { setUsers } = actions;
