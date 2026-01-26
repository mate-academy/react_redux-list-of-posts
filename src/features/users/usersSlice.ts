import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

type UserState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UserState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const usersReducer = usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersHasError = (state: RootState) => state.users.hasError;
