import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types/Post';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { getUserPosts } from '../../api/posts';

export type PostsState = {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: PostsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initPosts = createAsyncThunk(
  'posts/fetch',
  (userId: number) => {
    return getUserPosts(userId);
  },
);

/* eslint-disable no-param-reassign */
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePosts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loaded = true;
        state.items = action.payload;
      });

    builder.addCase(initPosts.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { removePosts } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
