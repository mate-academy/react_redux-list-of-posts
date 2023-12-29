/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
// eslint-disable-next-line import/no-cycle

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
  visible: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: '',
  visible: false,
};

export const init = createAsyncThunk(
  'comments/fetch', (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      // eslint-disable-next-line max-len
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
    setError: (state) => {
      state.hasError = 'Something went wrong with post details';
    },
    resetLoaded: (state) => {
      state.loaded = false;
    },
    resetError: (state) => {
      state.hasError = '';
    },
    resetVisible: (state) => {
      state.visible = false;
    },
    setVisible: (state) => {
      state.visible = true;
    },
  },
});

export const {
  setComments,
  addComment,
  removeComment,
  setError,
  resetError,
  resetLoaded,
  setLoaded,
  setVisible,
  resetVisible,
} = commentsSlice.actions;

export default commentsSlice.reducer;
