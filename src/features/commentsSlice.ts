/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  fetchingStatus: Status;
  postingStatus: Status;
  deletingStatus: Status;
}

const initialState: CommentsState = {
  comments: [],
  fetchingStatus: Status.Idle,
  postingStatus: Status.Idle,
  deletingStatus: Status.Idle,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const postComment = createAsyncThunk(
  'comments/postComment',
  async (comment: Omit<Comment, 'id'>) => {
    const postedComment = await createComment(comment);

    return postedComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchingStatus = Status.Loading;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.fetchingStatus = Status.Idle;
          state.comments = action.payload;
        },
      )
      .addCase(fetchComments.rejected, (state) => {
        state.fetchingStatus = Status.Failed;
      })
      .addCase(postComment.pending, (state) => {
        state.postingStatus = Status.Loading;
      })
      .addCase(
        postComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.postingStatus = Status.Idle;
          state.comments.push(action.payload);
        },
      )
      .addCase(postComment.rejected, (state) => {
        state.postingStatus = Status.Failed;
      })
      .addCase(removeComment.pending, (state) => {
        state.deletingStatus = Status.Loading;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.deletingStatus = Status.Idle;
          state.comments = state.comments
            .filter(comment => comment.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, (state) => {
        state.deletingStatus = Status.Failed;
      });
  },
});
