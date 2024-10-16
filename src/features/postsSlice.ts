import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

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

// Asynchronous Thunk for loading users
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await client.get<Post[]>(`/posts?userId=${userId}`);

    return response;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(fetchUserPosts.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export default postsSlice.reducer;
