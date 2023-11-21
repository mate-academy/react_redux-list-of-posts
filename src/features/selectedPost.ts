/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Post } from '../types/Post';

type SelectedPostState = {
  selectedPost: Post | null,
};

const initialState: SelectedPostState = {
  selectedPost: null,
};

export const fetchPost = createAsyncThunk('selectedPost/fetch',
  (postId: number) => {
    return getPostComments(postId);
  });

const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { setSelectedPost, clearSelectedPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
