/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Status } from '../types/Status';

interface CommentsState {
  comments: Comment[];
  status: {
    fetchComments: Status;
    addComment: Status;
    removeComment: Status;
  };
}

const initialState: CommentsState = {
  comments: [],
  status: {
    fetchComments: Status.idle,
    addComment: Status.idle,
    removeComment: Status.idle,
  },
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

type AddComment = {
  commentData: CommentData;
  postId: number;
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ commentData, postId }: AddComment) => {
    const response = await createComment({
      ...commentData,
      postId,
    });

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.status.fetchComments = Status.loading;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status.fetchComments = Status.idle;
      })
      .addCase(fetchComments.rejected, state => {
        state.status.fetchComments = Status.failed;
      })
      .addCase(addComment.pending, state => {
        state.status.addComment = Status.loading;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status.addComment = Status.idle;
      })
      .addCase(addComment.rejected, state => {
        state.status.addComment = Status.failed;
      })
      .addCase(removeComment.pending, (state, action) => {
        state.status.removeComment = Status.loading;

        state.comments = state.comments.filter(
          comment => comment.id !== action.meta.arg,
        );
      })
      .addCase(removeComment.fulfilled, state => {
        state.status.removeComment = Status.idle;
      })
      .addCase(removeComment.rejected, state => {
        state.status.removeComment = Status.failed;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
