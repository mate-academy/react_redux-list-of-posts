// postsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { RootState } from '../app/store';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const data = await client.get<Post[]>('/posts');
  return data;
});

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const data = await client.get<Post[]>(`/posts?userId=${userId}`);
    return data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, state => {
        state.hasError = true;
      })

      .addCase(fetchUserPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUserPosts.rejected, state => {
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loaded;
export const selectPostsError = (state: RootState) => state.posts.hasError;
