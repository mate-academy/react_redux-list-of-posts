import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/featch',
  (authorId: number) => {
    return getUserPosts(authorId);
  },
);
const postsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<Post[]>) {
      const currentState = state;

      currentState.items = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      const currentState = state;

      currentState.hasError = false;
      currentState.loaded = false;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      const currentState = state;

      currentState.items = action.payload;
      currentState.loaded = true;
    });
    builder.addCase(loadPosts.rejected, state => {
      const currentState = state;

      currentState.hasError = true;
      currentState.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const PostsActions = {
  ...postsSlice.actions,
  loadPosts,
};
