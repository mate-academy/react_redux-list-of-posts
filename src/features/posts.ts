import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const initialState = {
  posts: [] as Post[],
  loading: false,
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Post[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.posts = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      return { ...state, loading: true, error: '' };
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      return { ...state, loading: false, posts: action.payload };
    });

    builder.addCase(loadPosts.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message || '' };
    });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
