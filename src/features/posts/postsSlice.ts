import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostsState = {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPosts = createAsyncThunk('posts/fetch', getUserPosts);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state) => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const newState: PostsState = {
        ...state,
        items: action.payload,
        loaded: true,
      };

      return newState;
    });

    builder.addCase(fetchPosts.pending, (state) => {
      const newState: PostsState = {
        ...state,
        loaded: false,
      };

      return newState;
    });

    builder.addCase(fetchPosts.rejected, (state) => {
      const newState: PostsState = {
        ...state,
        loaded: true,
        hasError: true,
      };

      return newState;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
