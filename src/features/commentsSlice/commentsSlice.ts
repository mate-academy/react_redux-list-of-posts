/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentApi,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const comment = await createComment(data);

    return comment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const response = await deleteCommentApi(commentId);

    return response;
  },
);

type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});
