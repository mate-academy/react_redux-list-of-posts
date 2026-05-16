import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default authorSlice.reducer;

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUserPosts();

  return users;
});
