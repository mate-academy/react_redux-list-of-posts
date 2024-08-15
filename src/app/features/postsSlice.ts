import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

const initialState = {
  items: [] as Post[],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlise = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    newPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loaded: false };
    });

    builder.addCase(loadPosts.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });
  },
});

export const { newPosts } = postsSlise.actions;
