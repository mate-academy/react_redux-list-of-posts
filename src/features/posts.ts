/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type State = {
  posts: Post[],
  selectedPost: Post | null,
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  posts: [],
  selectedPost: null,
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk(
  'posts/initPosts',
  async (userId: number) => {
    const posts = await getUserPosts(userId);

    return posts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loaded = true;
      });

    builder.addCase(initPosts.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default postsSlice.reducer;
export const { setSelectedPost } = postsSlice.actions;
