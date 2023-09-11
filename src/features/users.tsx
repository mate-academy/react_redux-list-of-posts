/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string;
};

export const init = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    clear: (state) => {
      state.users = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { setUser, clear } = usersSlice.actions;
export default usersSlice.reducer;
