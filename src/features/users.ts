/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  items: User[];
  loading: boolean;
}

const initialState: UsersState = {
  items: [],
  loading: false,
};

let isFetching = false;
let isLoaded = false;

export const initUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    try {
      const users = await getUsers();

      isLoaded = true;

      return users;
    } finally {
      isFetching = false;
    }
  },
  {
    condition: () => {
      if (isFetching) {
        return false;
      }

      if (isLoaded) {
        return false;
      }

      isFetching = true;

      return true;
    },
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initUsers.pending, state => {
        state.loading = true;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(initUsers.rejected, state => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
