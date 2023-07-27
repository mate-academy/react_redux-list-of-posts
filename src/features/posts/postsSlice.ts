/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { Status } from '../../types/Status';

export interface State {
  posts: Post[],
  selectedPost: Post | null
  status: Status,
}

const initialState: State = {
  posts: [],
  selectedPost: null,
  status: Status.Idle,
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (authorId: number) => {
    const posts = await getUserPosts(authorId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsAsync.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.status = Status.Failed;
      });
  },
});

export const { setSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
