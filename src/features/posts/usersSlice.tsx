/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loaded: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.loaded = true;
      state.error = 'Error';
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
