import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

const initialState = {
  loaded: false,
  items: [] as Post[],
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (authorId: number) => {
  return getUserPosts(authorId);
});

const postsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<Post[]>) {
      state.items = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default postsSlice.reducer;
export const PostsActions = {
  ...postsSlice.actions,
  loadPosts,
};
