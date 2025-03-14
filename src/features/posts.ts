import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  posts: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
};
const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loaded: true,
  hasError: false,
};

export const init = createAsyncThunk('posts/fetch', (id: number) => {
  return getUserPosts(id);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Post>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
    reject: state => {
      return {
        ...state,
        selectedPost: null,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      };
    });

    builder.addCase(init.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default postsSlice.reducer;

export const { select, reject } = postsSlice.actions;
