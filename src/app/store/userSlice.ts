import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [] as User[],
  loading: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk<User[]>('users/load', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
