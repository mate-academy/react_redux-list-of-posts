/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type Users = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: Users = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Can not download users';
    });
  },
});

export default usersSlice.reducer;
export const init = createAsyncThunk('users/fetch', getUsers);
