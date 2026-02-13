/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import * as postsApi from '../../api/posts';

interface ApiError {
  message: string;
}

export interface PostsState {
  items: Post[];
  isLoading: boolean;
  error: { message: string } | null;
}

const initialState: PostsState = {
  items: [],
  isLoading: false,
  error: null,
};

/* prettier-ignore */
export const fetchPosts = createAsyncThunk<
Post[],
number,
{ rejectValue: { message: string } }
>('posts/fetchPosts', async (userId, { rejectWithValue }) => {
  try {
    const data = await postsApi.getUserPosts(userId);

    return data;
  } catch (err: unknown) {
    const error: ApiError = { message: 'Failed' };

    if (err instanceof Error) {
      error.message = err.message;
    }

    return rejectWithValue(error);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.items = action.payload;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
