import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getPosts, getUserPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId: number) => {
  const posts = await getUserPosts(userId);
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
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, items: action.payload };
    },
    // setLoaded: (state, action: PayloadAction<boolean>) => {
    //   return { ...state, loaded: action.payload };
    // },
    // setError: (state, action: PayloadAction<string>) => {
    //   return { ...state, hasError: action.payload };
    // },
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
      state.hasError = 'Failed to load posts';
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
