/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const init = createAsyncThunk('users/fetch', getUsers);

type UsersState = {
  arrayOfUsers: User[] | null;
};

const initialState: UsersState = {
  arrayOfUsers: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.arrayOfUsers = action.payload;
    });
  },
});

export default usersSlice.reducer;
