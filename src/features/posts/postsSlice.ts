import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserPosts } from '../../api/posts';

import { Post } from '../../types/Post';

export interface Posts {
  items: Post[];
  selectedPost: Post | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: Posts = {
  items: [],
  selectedPost: null,
  loaded: true,
  hasError: false,
};

export const loadUserPosts = createAsyncThunk(
  'posts/loadPosts',
  async (id: number) => {
    const posts = getUserPosts(id);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    addSelectedPost: (state, action: PayloadAction<Post | null>) => {
      return {
        ...state,
        selectedPost: action.payload,
      };
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadUserPosts.pending, state => {
        return { ...state, loaded: false };
      })
      .addCase(
        loadUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          return {
            ...state,
            items: action.payload,
            loaded: true,
          };
        },
      )
      .addCase(loadUserPosts.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export const { addSelectedPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
