import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const init = createAsyncThunk(
  'posts/fetchPost',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      /* eslint-disable-next-line no-param-reassign */
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      /* eslint-disable-next-line no-param-reassign */
      state.posts = action.payload;
      /* eslint-disable-next-line no-param-reassign */
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      /* eslint-disable-next-line no-param-reassign */
      state.loading = false;
      /* eslint-disable-next-line no-param-reassign */
      state.error = 'Error!';
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
