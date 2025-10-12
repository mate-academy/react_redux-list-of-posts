/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { RootState } from '../app/store';

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

export const loadPostComments = createAsyncThunk(
  'comments/loadPostComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      state.hasError = false;
      state.loaded = true;
    });
    builder.addCase(
      loadPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = false;
        state.items = action.payload;
      },
    );
    builder.addCase(loadPostComments.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
    builder.addCase(addNewComment.pending, state => {
      state.hasError = false;
      state.loaded = true;
    });
    builder.addCase(
      addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );
    builder.addCase(addNewComment.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
  },
});

export const selectComments = (state: RootState) => state.comments;
export const { setError } = commentsSlice.actions;
export default commentsSlice.reducer;
