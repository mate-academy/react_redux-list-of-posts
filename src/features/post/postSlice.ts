/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, removeData } from '../../api/api';

export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (userId: number): Promise<Post[]> => {
    if (userId) {
      return getData(`/posts?userId=${userId}`);
    }

    return getData('/posts/');
  },
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: number) => {
    return removeData(`posts/${postId}`);
  },
);

const initialState: PostState = {
  posts: [],
  selectedPostId: 0,
  isPostsLoading: true,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changePostId: (state: PostState, action) => {
      state.selectedPostId = action.payload;
    },
  },

  extraReducers: {
    [getPosts.pending.type]: (state: PostState) => {
      state.isPostsLoading = true;
    },
    [getPosts.fulfilled.type]: (state: PostState, action) => {
      state.isPostsLoading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected.type]: (state: PostState) => {
      state.isPostsLoading = false;
    },
  },
});

export const { changePostId } = postSlice.actions;

export default postSlice.reducer;
