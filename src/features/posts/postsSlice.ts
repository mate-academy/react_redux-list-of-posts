import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

type InitialState = {
  posts: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  posts: [],
  loaded: false,
  hasError: false,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    return getUserPosts(userId);
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    userPosts: (state, { payload }: PayloadAction<Post[]>) => {
      return { ...state, posts: payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserPosts.pending, state => ({
      ...state,
      loaded: false,
      hasError: false,
    }));
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => ({
      ...state,
      posts: action.payload,
      loaded: true,
    }));
    builder.addCase(fetchUserPosts.rejected, state => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});
