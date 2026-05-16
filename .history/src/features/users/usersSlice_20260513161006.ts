import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
