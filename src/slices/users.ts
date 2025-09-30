import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  loading: boolean;
  users: User[];
  error: string;
}

const initialState: UsersState = {
  loading: false,
  users: [],
  error: '',
};

export const loadUsers = createAsyncThunk<User[], void>('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<User[]>) {
      const currentState = state;

      currentState.users = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      const currentState = state;

      currentState.error = '';
      currentState.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      const currentState = state;

      currentState.users = action.payload;
      currentState.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      const currentState = state;

      currentState.error = action.error.message || '';
      currentState.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const UsersActions = {
  ...usersSlice.actions,
  loadUsers,
};
