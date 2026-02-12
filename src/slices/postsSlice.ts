import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { RootState } from '../app/store';
import { client } from '../utils/fetchClient';

type PostsState = {
  items: Post[];
  loading: boolean;
  error: boolean;
};

const initialState: PostsState = {
  items: [],
  loading: false,
  error: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await client.get<Post[]>(`/posts?userId=${userId}`);

    return response;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserPosts.pending, state => {
        return { ...state, loading: true, error: false };
      })
      .addCase(
        fetchUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return { ...state, loading: false, items: action.payload };
        },
      )
      .addCase(fetchUserPosts.rejected, state => {
        return { ...state, loading: false, error: true };
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
