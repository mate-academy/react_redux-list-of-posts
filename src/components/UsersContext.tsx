import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
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

export const UsersContext = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(users.pending, state => {
      state.loading = true;
    });
    builder.addCase(users.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(users.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { setUsers, setSelectedUser } = UsersContext.actions;
export default UsersContext.reducer;

export const users = createAsyncThunk('/users', () => {
  return getUsers();
});
