/* eslint-disable no-param-reassign */
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type CommentsState = {
  items: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => getPostComments(postId),
);

export const postComment = createAsyncThunk(
  'post/comment',
  (commentData: Omit<Comment, 'id'>) => createComment(commentData),
);

export const removeComment = createAsyncThunk(
  'delete/comment',
  async (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loading = true;
    }).addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    }).addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    }).addCase(postComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.meta.arg);
    }).addCase(removeComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { deleteItem } = commentsSlice.actions;
