import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/load', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
