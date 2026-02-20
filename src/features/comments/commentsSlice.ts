/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  Comment as CustomComment,
  CommentData as CustomCommentData,
} from '../../types/Comment';
import { DataState } from '../../types/DataState';
import {
  getPostComments,
  createComment as apiCreateComment,
  deleteComment as apiDeleteComment,
} from '../../api/comments';

const initialState: DataState<CustomComment> = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchCommentsByPostId',
  async (postId: number, { rejectWithValue }) => {
    try {
      const comments = await getPostComments(postId);

      return comments;
    } catch (error) {
      return rejectWithValue('Failed to fetch comments');
    }
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: CustomCommentData, { rejectWithValue }) => {
    try {
      const newComment = await apiCreateComment(commentData);

      return newComment;
    } catch (error) {
      return rejectWithValue('Failed to add comment');
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await apiDeleteComment(commentId);

      return commentId;
    } catch (error) {
      return rejectWithValue('Failed to delete comment');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(
        fetchCommentsByPostId.fulfilled,
        (state, action: PayloadAction<CustomComment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchCommentsByPostId.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<CustomComment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(deleteComment.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
