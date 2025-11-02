import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPost = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      return { ...state, items: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadPost.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(loadPost.fulfilled, (state, action: PayloadAction<Post[]>) => ({
        ...state,
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(loadPost.rejected, state => ({
        ...state,
        loaded: true,
        hasError: false,
        items: [],
      }));
  },
});

export const { setPosts } = postsSlice.actions;
