/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type Status = 'idle' | 'loading' | 'failed';

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
    fetchComments: 'idle',
    addComment: 'idle',
    removeComment: 'idle',
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
        state.status.fetchComments = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status.fetchComments = 'idle';
      })
      .addCase(fetchComments.rejected, state => {
        state.status.fetchComments = 'failed';
      })
      .addCase(addComment.pending, state => {
        state.status.addComment = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status.addComment = 'idle';
      })
      .addCase(addComment.rejected, state => {
        state.status.addComment = 'failed';
      })
      .addCase(removeComment.pending, state => {
        state.status.removeComment = 'loading';
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.status.removeComment = 'idle';
      })
      .addCase(removeComment.rejected, state => {
        state.status.removeComment = 'failed';
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
