import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}
const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const user = await getUsers();

  return user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      },
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });
  },
});

export default usersSlice.reducer;
