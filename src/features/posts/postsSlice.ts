/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  posts: Post[],
  loading: boolean,
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('posts/fetch', async (userId: number) => {
  const value = await getUserPosts(userId);

  return value;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = true;
      state.posts = action.payload;
    });
    builder.addCase(init.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default postsSlice.reducer;
export const { actions } = postsSlice;
