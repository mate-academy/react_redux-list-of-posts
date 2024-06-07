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
        state.loaded = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;

        state.loaded = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.error = true;

        state.loaded = false;
      });
  },
});

export default usersSlice.reducer;
