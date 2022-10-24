import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { fetchPosts } from './postsAPI';

export interface PostsState {
  allPosts: Post[] | null;
  selectedPost: Post | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostsState = {
  allPosts: null,
  selectedPost: null,
  status: 'idle',
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (userID: number) => {
    const posts = await fetchPosts(userID);

    // The value we return becomes the `fulfilled` action payload
    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<Post | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'loading';
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.allPosts = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'failed';
      });
  },
});

export const { setPost } = postsSlice.actions;
export default postsSlice.reducer;
