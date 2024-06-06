import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  loaded: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  error: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await getUsers();

  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.users = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      })
      .addCase(fetchUsers.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.error = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      });
  },
});

export default usersSlice.reducer;
