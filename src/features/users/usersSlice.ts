/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UserState {
  users: User[],
  loaded: boolean,
  hasError: boolean
}

export const initialState: UserState = {
  users: [],
  loaded: false,
  hasError: false,
};

const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    return getUsers();
  },
);

const userSlice = createSlice({
  name: 'usres',
  initialState,
  reducers: {
    set: (state) => state,
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

export const { set } = userSlice.actions;
export default userSlice.reducer;
