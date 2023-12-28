/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[],
  loading: boolean,
  error: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const initComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComments',
  async (comment: Comment) => {
    const data = await createComment(comment);

    return data;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(item => item.id !== action.payload);
    },
    clearAll: (state:CommentsState) => {
      state.comments = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(initComments.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments.push(payload);
      })
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state:CommentsState, action:PayloadAction<number>) => {
        state.loading = false;
        state.comments = state.comments.filter(item => item.id !== action.payload);
      });
  },
});

export const { add, remove, clearAll } = commentsSlice.actions;
export default commentsSlice.reducer;
