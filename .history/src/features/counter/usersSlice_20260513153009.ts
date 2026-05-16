import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../api/users';
import { User } from '../../types/User';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state,) => {
      state.loading = false;
      state.error = 'Something went wrond';
    });
  },
});

export default userSlice.reducer;

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUser();

  return users;
});
