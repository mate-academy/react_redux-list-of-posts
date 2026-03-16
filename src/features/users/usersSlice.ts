import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

export interface UsersState {
  items: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: '',
};

export const setUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const users: User[] = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(setUsersAsync.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(setUsersAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(setUsersAsync.rejected, state => {
        state.loading = false;
        state.error = 'Falied to load users';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoading = (s: RootState) => s.users.loading;
export const selectUsersError = (s: RootState) => s.users.error;

export default usersSlice.reducer;
