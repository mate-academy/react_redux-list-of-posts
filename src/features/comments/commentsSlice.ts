/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  deleteComment,
  createComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  error: boolean;
  loading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  error: false,
  loading: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const remove = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const add = createAsyncThunk(
  'comments/post',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          item => item.id !== action.payload,
        );
      })
      .addCase(add.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      });
  },
});

export default commentsSlice.reducer;
