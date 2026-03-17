/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as services from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return services.getPostComments(postId);
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  (data: Omit<Comment, 'id'>) => {
    return services.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  (id: number) => {
    return services.deleteComment(id);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.meta.arg);
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
