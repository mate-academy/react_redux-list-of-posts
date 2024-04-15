import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

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

export const users = createAsyncThunk('/users', () => {
  return getUsers();
});

export const UsersContext = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      const currentState = state;

      currentState.users = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User>) {
      const currentState = state;

      currentState.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(users.pending, state => {
      const currentState = state;

      currentState.loading = true;
    });

    builder.addCase(users.fulfilled, (state, action) => {
      const currentState = state;

      currentState.users = action.payload;
      currentState.loading = false;
    });

    builder.addCase(users.rejected, state => {
      const currentState = state;

      currentState.loading = false;
      currentState.error = 'Error';
    });
  },
});

export const { setUsers, setSelectedUser } = UsersContext.actions;
export default UsersContext.reducer;
