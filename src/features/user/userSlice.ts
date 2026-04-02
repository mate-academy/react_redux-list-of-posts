/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  loading: boolean;
  users: User[];
  error: string;
}

const initialState: UsersState = {
  loading: false,
  users: [],
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', async () =>
  getUsers(),
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
