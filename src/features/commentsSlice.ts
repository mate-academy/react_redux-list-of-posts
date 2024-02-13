/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const removeComment = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .filter(comment => comment.id !== action.payload);
    },
  },
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items
        .filter(comment => comment.id !== action.payload);
    },
    clearComments: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewComment.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteComments.fulfilled, (state) => {
        state.hasError = false;
      });
  },
});

export const {
  reducer: commentsReducer,
  actions: commentsActions,
} = commentsSlice;
