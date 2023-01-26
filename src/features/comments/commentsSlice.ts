/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetchInit',
  (postId: number) => getPostComments(postId),
);

export const addNewComment = createAsyncThunk(
  'comments/fetchCreate',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const removeComment = createAsyncThunk(
  'comments/fetchRemove',
  (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => builder
    .addCase(initComments.pending, (state) => {
      state.loaded = false;
    })
    .addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    })
    .addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    })
    .addCase(addNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(addNewComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    })
    .addCase(removeComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    }),
});

export default commentsSlice.reducer;
export const { setComments } = commentsSlice.actions;
