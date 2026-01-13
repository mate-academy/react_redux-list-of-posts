import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const initPosts = createAsyncThunk('posts/fetch', () => {
  return getPosts();
});

type PostsState = {
  loading: boolean;
  hasError: boolean;
  items: Post[];
};

const initialState: PostsState = {
  loading: false,
  hasError: false,
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initPosts.pending, state => ({
      ...state,
      loading: true,
    }));

    builder.addCase(initPosts.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));

    builder.addCase(initPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loading: false,
    }));
  },
});
