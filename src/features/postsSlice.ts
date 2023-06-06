import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk('posts/fetch', (userId: number) => {
  return getUserPosts(userId);
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => ({
      ...state,
      items: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(loadPosts.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(loadPosts.rejected, (state) => ({
      ...state,
      hasError: true,
      loaded: true,
    }));
  },
});

export default postsSlice.reducer;
export const { setPosts } = postsSlice.actions;
