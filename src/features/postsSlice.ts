import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

export interface PostsState {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
}

export const loadUserPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

const initialState: PostsState = {
  posts: [],
  loaded: false,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
    clearPosts: (state) => {
      return {
        ...state,
        posts: [],
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserPosts.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(loadUserPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loaded: true,
      };
    });

    builder.addCase(loadUserPosts.rejected, (state) => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});

export default postsSlice.reducer;
export const {
  addPosts,
  clearPosts,
  setLoaded,
  setError,
} = postsSlice.actions;
