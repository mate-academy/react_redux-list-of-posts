import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export const loadPosts = createAsyncThunk<Post[], number>(
  'posts/loadPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(
      loadPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
        };
      },
    );

    builder.addCase(loadPosts.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});
