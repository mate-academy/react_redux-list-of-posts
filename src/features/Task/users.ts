/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { client } from '../../utils/axiosClient';
import { RootState } from '../../app/store';

export type UsersState = {
  loadedUsers: User[];
  isLoading: boolean;
  isError: boolean;
};

const initialState: UsersState = {
  loadedUsers: [],
  isLoading: false,
  isError: false,
};

export const loadUsers = createAsyncThunk<User[]>(
  'users/fetch',
  async () => {
    const data = await client.get<User[]>('/users');

    return data;
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState() as RootState;

      if (users.loadedUsers.length > 0) {
        return false;
      }

      return true;
    },
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUsers.pending, state => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loadedUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUsers.rejected, state => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
