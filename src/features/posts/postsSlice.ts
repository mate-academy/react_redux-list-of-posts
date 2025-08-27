import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';
// import { Post } from '../../types/Post';
import { PostsState } from '../../types/State';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        items: action.payload,
      }))
      .addCase(fetchPosts.rejected, state => ({
        ...state,
        loaded: false,
        hasError: true,
      }));
  },
});

export default postsSlice.reducer;
