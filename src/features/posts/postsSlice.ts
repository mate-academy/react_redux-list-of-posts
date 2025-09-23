import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getPosts } from '../../api/postApi';

type PostState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', async () => {
  const postsFromServer = await getPosts();

  return postsFromServer;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostsList: state => {
      state.items = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(loadPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(loadPosts.rejected, state => {
        state.hasError = 'Failed to load posts';
        state.loaded = true;
      });
  },
});

export const { clearPostsList } = postsSlice.actions;

export default postsSlice.reducer;
