/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[] | null,
  loading: boolean,
  error: string,
}

const initialState: UsersState = {
  users: null,
  loading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk(
  'user/fetch',
  async () => {
    return getUsers();
  },
);

export const usersSlicer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: UsersState, action: PayloadAction<User [] | null>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = 'Failed to load user';
        state.loading = false;
      });
  },
});

export const { setUsers } = usersSlicer.actions;
export default usersSlicer.reducer;
