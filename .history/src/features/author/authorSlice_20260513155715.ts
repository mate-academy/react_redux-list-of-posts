import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

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

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const author = await getUserPosts();

  return author;
});
