/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const commentsLoad = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(commentsLoad.pending, state => {
      state.loaded = true;
    });
    builder.addCase(commentsLoad.fulfilled, (state, action) => {
      state.loaded = false;
      state.items = action.payload;
    });
    builder.addCase(commentsLoad.rejected, state => {
      state.loaded = false;
      state.hasError = 'error with comments';
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = 'new comment error';
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = 'delete comment error';
    });
  },
});

export default commentsSlice.reducer;
export const { clear } = commentsSlice.actions;
