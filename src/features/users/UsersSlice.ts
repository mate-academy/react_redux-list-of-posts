/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const usersAsync = createAsyncThunk('users/get', () => {
  return getUsers();
});

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    add: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    remove: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter(user => user !== action.payload);
    },
    clear: (state) => {
      state.users = [];
    },
    selectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(usersAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(usersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(usersAsync.rejected, (state) => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
