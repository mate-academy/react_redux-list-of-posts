/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle

export interface UserState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
