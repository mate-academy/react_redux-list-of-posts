import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

export interface PostsState {
  loaded: boolean;
  items: Post[];
  hasError: string;
}

const initialState: PostsState = {
  loaded: true,
  items: [] as Post[],
  hasError: '',
};

export const setPostsAsync = createAsyncThunk(
  'posts/fetch',
  (userId: Post['userId'] | null) => {
    if (userId === null) {
      return;
    }

    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setPostsAsync.pending, state => {
      return { ...state, hasError: '', loaded: false };
    });
    builder.addCase(setPostsAsync.fulfilled, (state, action) => {
      return { ...state, items: action.payload ?? [], loaded: true };
    });
    builder.addCase(setPostsAsync.rejected, (state, action) => {
      return {
        ...state,
        hasError: action.error.message || '',
        loaded: true,
      };
    });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
