/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loaded: true, // Изначально загрузка не идет
  hasError: false,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loaded = false; // Началась загрузка
        state.hasError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loaded = true; // Загрузка завершена успешно
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchPosts.rejected, state => {
        state.loaded = true; // Загрузка завершена (с ошибкой)
        state.hasError = true;
      });
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
