/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get<Post[]>('/posts');

  return response;
});

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts',
  async (userId: number) => {
    const response = await client.get<Post[]>(`/posts?userId=${userId}`);

    return response;
  });

export const loadingStatus = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

export type Status = typeof loadingStatus[keyof typeof loadingStatus];

export type PostsState = {
  posts: Post[],
  loaded: Status,
  hasError: string | null,
};

const initialState: PostsState = {
  posts: [],
  loaded: loadingStatus.idle,
  hasError: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loaded = loadingStatus.loading;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = loadingStatus.succeeded;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loaded = loadingStatus.failed;
        state.hasError = action.error.message || null;
      });
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
