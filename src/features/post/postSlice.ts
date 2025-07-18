import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type PostState = {
  posts: Post[];
  loading: boolean;
  error: string;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: '',
};

export const initPost = createAsyncThunk('posts/fetchPost', (userId: number) =>
  getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      return { ...state, posts: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initPost.pending, state => {
        return { ...state, loading: true, error: '' };
      })
      .addCase(initPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
        return { ...state, posts: action.payload, loading: false, error: '' };
      })
      .addCase(initPost.rejected, state => {
        return {
          ...state,
          loading: false,
          error: 'something went wrong',
        };
      });
  },
});

export const { setPosts } = postsSlice.actions;
