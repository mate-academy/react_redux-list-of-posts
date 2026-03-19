import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

interface PostState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}

const initialState: PostState = {
  items: [],
  loading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const { reducer, actions } = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clear: state => ({
      ...state,
      items: [],
    }),
  },
  extraReducers: builder => {
    builder.addCase(loadPosts.pending, state => ({
      ...state,
      hasError: false,
      loading: true,
    }));

    builder.addCase(loadPosts.rejected, state => ({
      ...state,
      loading: false,
      hasError: true,
    }));

    builder.addCase(loadPosts.fulfilled, (state, action) => ({
      ...state,
      hasError: false,
      loading: false,
      items: action.payload,
    }));
  },
});
