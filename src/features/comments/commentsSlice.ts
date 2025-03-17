/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

const initialState = {
  comment: [] as Comment[],
  loaded: true,
  hasError: '',
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.loaded = false;
      state.hasError = '';
    },
    fetchCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.loaded = true;
      state.comment = action.payload;
    },
    fetchCommentsFailed(state, action: PayloadAction<string>) {
      state.loaded = true;
      state.hasError = action.payload;
    },
    addCommentSuccess(state, action: PayloadAction<Comment>) {
      state.comment.push(action.payload);
    },
    deleteCommentSuccess(state, action: PayloadAction<number>) {
      state.comment = state.comment.filter(c => c.id !== action.payload);
    },
  },
});

export default commentSlice.reducer;
export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailed,
  addCommentSuccess,
  deleteCommentSuccess,
} = commentSlice.actions;
