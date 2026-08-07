import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

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
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(fetchPosts.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { setPosts, setLoaded } = postsSlice.actions;
export default postsSlice.reducer;
