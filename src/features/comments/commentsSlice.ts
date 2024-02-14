/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

interface CommentsState {
  comments: Comment[],
  loading: boolean,
  error: boolean,
  submitting: boolean,
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
  submitting: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentsApi.getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    clear: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })

      .addCase(addComment.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.submitting = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.submitting = false;
      });
  },
});

export default commentsSlice.reducer;
export const { deleteComment, clear } = commentsSlice.actions;
