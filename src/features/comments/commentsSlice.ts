/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { Status } from '../../types/Status';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface State {
  comments: Comment[]
  status: Status,
}

const initialState: State = {
  comments: [],
  status: Status.Idle,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.status = Status.Loading;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.status = Status.Failed;
      });

    builder
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = Status.Idle;
      })
      .addCase(addCommentAsync.rejected, state => {
        state.status = Status.Failed;
      });

    builder
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.comments = state.comments.filter(({ id }) => {
          return id !== action.payload;
        });
        state.status = Status.Idle;
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.status = Status.Failed;
      });
  },
});

export default commentsSlice.reducer;
