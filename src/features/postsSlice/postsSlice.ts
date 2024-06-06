import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  loaded: false,
  error: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const response = await getUserPosts(userId);

    return response;
  },
);

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.posts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.posts = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.error = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
      });
  },
});

export const { setPosts } = PostsSlice.actions;
export default PostsSlice.reducer;
