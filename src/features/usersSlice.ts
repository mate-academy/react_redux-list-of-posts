/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[],
}

const initialState: UsersState = {
  users: [],
};

export const init = createAsyncThunk(
  'users/fetch',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      init.fulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
