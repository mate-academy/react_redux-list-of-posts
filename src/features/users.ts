/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: '',
};

export const init = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    resetSelectedUser: state => {
      state.selectedUser = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, (state: UsersState) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state: UsersState, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state: UsersState) => {
      state.loading = false;
      state.error = 'Error loading users';
    });
  },
});

export default usersSlice.reducer;
export const { setSelectedUser, setUsers } = usersSlice.actions;
