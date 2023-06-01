/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
}

export const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter((comment) => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
