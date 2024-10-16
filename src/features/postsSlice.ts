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

// Асинхронный thunk для загрузки постов пользователя
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
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(fetchUserPosts.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      });
  },
});

export default postsSlice.reducer;
