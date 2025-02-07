import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const loadPost = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    hidePosts: state => {
      state.posts = [];
    },
  },

  extraReducers: builder => {
    builder.addCase(loadPost.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      loadPost.fulfilled,
      (state, actions: PayloadAction<Post[]>) => {
        state.hasError = false;
        state.loaded = true;
        state.posts = actions.payload;
      },
    );
    builder.addCase(loadPost.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { hidePosts } = PostSlice.actions;

export default PostSlice.reducer;
