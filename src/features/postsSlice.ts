import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const fetchPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loaded: false,
    hasError: false,
  },
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
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchPosts.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }));
  },
});

export default postsSlice.reducer;
