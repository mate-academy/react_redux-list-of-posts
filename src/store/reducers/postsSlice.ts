/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
import { getUserPosts } from '../../api/posts';

export interface PostsState {
  postsList: Post[];
  selectedPost: null | Post;
  loaded: boolean;
  hasError: boolean;
}

const initialState: PostsState = {
  postsList: [],
  selectedPost: null,
  loaded: true,
  hasError: false,
};

export const fetchUsersPosts = async (userId: number) => {
  const posts = await getUserPosts(userId);

  return posts;
};

export const getPostsAsync = createAsyncThunk(
  'posts/fetchUsersPosts',
  async (userId: number) => {
    const value = await fetchUsersPosts(userId);

    return value;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsList: (state, action: PayloadAction<Post[]>) => {
      state.postsList = action.payload;
    },
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getPostsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.postsList = action.payload;
      })
      .addCase(getPostsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setPostsList, selectPost } = postsSlice.actions;

export default postsSlice.reducer;
