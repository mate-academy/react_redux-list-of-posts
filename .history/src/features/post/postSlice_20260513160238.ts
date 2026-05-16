import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUserPosts } from '../../api/posts';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const authorSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchPosts.fulfilled, state => {
      state.loading = false;
      state.error = 'Something went wrond';
    });
  };
});

export default authorSlice.reducer;

export const fetchPosts = createAsyncThunk('users/fetch', async () => {
  const author = await getUserPosts();

  return author;
});
