import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: state => {
      return { ...state, items: [], loaded: false, hasError: false };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(fetchPosts.rejected, state => {
      return { ...state, loaded: true, hasError: true };
    });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
