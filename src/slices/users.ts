import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<User[]>) {
      state.users = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const UsersActions = {
  ...usersSlice.actions,
  loadUsers,
};
