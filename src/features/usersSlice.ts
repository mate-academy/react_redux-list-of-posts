import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const response = await getUsers();

  return response;
});

export type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = 'Error';
      });
  },
});

export const selectUserState = (state: RootState) => state.users;

export default usersSlice.reducer;
