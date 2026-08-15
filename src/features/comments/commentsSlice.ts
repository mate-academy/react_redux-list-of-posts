import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

import { Comment, CommentData } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => getPostComments(postId),
);

type AddCommentPayload = {
  postId: number;
  data: CommentData;
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: AddCommentPayload) => {
    return createComment({
      ...data,
      postId,
    });
  },
);

export const deleteCommentRequest = createAsyncThunk(
  'comments/deleteCommentRequest',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {
    clearComments: () => initialState,

    removeComment: (state, action) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),

    restoreComment: (state, action) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
  },

  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))

      .addCase(loadComments.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))

      .addCase(loadComments.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }))

      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        hasError: false,
        items: [...state.items, action.payload],
      }))

      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export const { clearComments, removeComment, restoreComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
