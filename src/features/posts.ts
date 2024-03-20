import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SliceType } from '../types/SliceType';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { SliceAsyncState } from '../types/SliceAsyncState';

enum ActionType {
  FetchPosts = 'posts/fetch',
}

const initialState: SliceAsyncState<Post[]> = {
  loaded: false,
  items: [],
  hasError: false,
};

export const setPosts = createAsyncThunk(
  ActionType.FetchPosts,
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const postsSlice = createSlice({
  name: SliceType.Posts,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setPosts.pending, state => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(setPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
    }));

    builder.addCase(setPosts.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export default postsSlice.reducer;
