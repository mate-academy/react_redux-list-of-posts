/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[],
  loaded: boolean,
  hasError: boolean,
  author: User | null,
}

export const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
  author: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    return getUsers();
  },
);

const userSlice = createSlice({
  name: 'usres',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = true;
      })
      .addCase(fetchUsers.fulfilled, (state, actions) => {
        state.loaded = false;
        state.users = actions.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default userSlice.reducer;
export const { setAuthor } = userSlice.actions;
