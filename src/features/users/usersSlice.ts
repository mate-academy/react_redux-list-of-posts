/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import type { PayloadAction } from '@reduxjs/toolkit';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  selectedUser: User | null;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedUser: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },

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

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
