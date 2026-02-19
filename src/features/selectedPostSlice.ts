/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { fetchComments } from './commentsSlice';

export const setSelectedPost = createAsyncThunk(
  'post/setSelectedPost',
  async (post: Post | null, { dispatch }) => {
    if (post) {
      dispatch(fetchComments(post.id));
    }

    return post;
  },
);

const initialState = {
  selectedPost: null as Post | null,
};

export const selectedPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      setSelectedPost.fulfilled,
      (state, action: PayloadAction<Post | null>) => {
        state.selectedPost = action.payload;
      },
    );
  },
});

export const selectedPost = (state: RootState) => state.post.selectedPost;

export default selectedPostSlice.reducer;
