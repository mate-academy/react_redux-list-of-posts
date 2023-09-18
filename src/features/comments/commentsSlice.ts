/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment, getPostComments, deleteComment,
} from '../../api/comments';

export const fetchComments = createAsyncThunk(
  'fetch/COMMENTS',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const fetchAddComment = createAsyncThunk(
  'fetch/ADD_COMMENT',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const fetchDeleteComment = createAsyncThunk(
  'fetch/DELETE_COMMENT',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export interface CommentsState {
  comments: Comment[] | null,
  loader: boolean,
  error: boolean,
  submitting: boolean,
}

const initialState: CommentsState = {
  comments: null,
  loader: false,
  error: false,
  submitting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      if (state.comments) {
        state.comments = state.comments.filter(comment => {
          return comment.id !== action.payload;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loader = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loader = false;
        state.error = true;
      })
      .addCase(fetchAddComment.pending, state => {
        state.submitting = true;
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.error = false;

        if (state.comments) {
          state.comments.push(action.payload);

          return;
        }

        state.comments = [action.payload];
      })
      .addCase(fetchAddComment.rejected, (state) => {
        state.submitting = false;
        state.error = true;
      });
  },
});

export const { actions } = commentsSlice;

export default commentsSlice.reducer;
