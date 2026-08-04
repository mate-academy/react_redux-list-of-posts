import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await getPosts();

  return posts;
});

type ItemStatus = {
  items: Post[];
  loaded: boolean;
  hasError: string;
};

const initialState: ItemStatus = {
  items: [],
  loaded: false,
  hasError: '',
};

export const postsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = false;
      state.hasError = 'Failed to load users';
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
