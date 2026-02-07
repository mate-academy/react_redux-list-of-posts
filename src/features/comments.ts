import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

/* eslint-disable no-param-reassign */
export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comment/add',
  async (data: Omit<Comment, 'id'>) => {
    const comments = await createComment(data);

    return comments;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comment/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(commentsAsync.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(commentsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(commentsAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentAsync.pending, state => {
        state.hasError = false;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
      })
      .addCase(addCommentAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.pending, state => {
        state.hasError = false;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});
export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
