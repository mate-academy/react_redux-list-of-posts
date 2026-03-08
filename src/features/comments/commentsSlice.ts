/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchByPost',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (commentId: number) => {
    return deleteComment(commentId).then(() => commentId);
  },
);

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
