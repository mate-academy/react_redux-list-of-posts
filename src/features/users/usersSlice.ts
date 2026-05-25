import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  loaded: false,
  error: false,
};

export const init = createAsyncThunk('users/init', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true; // eslint-disable-line no-param-reassign
        state.error = false; // eslint-disable-line no-param-reassign
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false; // eslint-disable-line no-param-reassign
        state.loaded = true; // eslint-disable-line no-param-reassign
        state.users = action.payload; // eslint-disable-line no-param-reassign
      })
      .addCase(init.rejected, state => {
        state.loading = false; // eslint-disable-line no-param-reassign
        state.error = true; // eslint-disable-line no-param-reassign
      });
  },
});

export default usersSlice.reducer;
