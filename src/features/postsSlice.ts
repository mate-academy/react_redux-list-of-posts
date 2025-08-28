import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { RootState } from '../app/store';

export interface PostsState {
  list: Post[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  list: [],
  status: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (authorId: number) => {
    const posts = await getUserPosts(authorId);

    return posts;
  },
);

export const postsSlice: Slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState): Post[] => state.posts.list;
export const selectPostsStatus = (state: RootState) => state.posts.status;
