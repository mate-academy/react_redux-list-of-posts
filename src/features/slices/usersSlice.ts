import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: string | null;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = false;
        state.hasError = 'Users can not be found';
      });
  },
});

export const selectUsersList = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
