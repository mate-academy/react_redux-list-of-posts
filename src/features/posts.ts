import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('posts/init', (userId: number) => {
  return getUserPosts(userId);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = true;
      state.hasError = '';
    });
    builder.addCase(init.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(init.rejected, state => {
      state.hasError = 'Failed to load posts';
      state.loaded = false;
    });
  },
});

export default postsSlice.reducer;
export const { clearPosts } = postsSlice.actions;
