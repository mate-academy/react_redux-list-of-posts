/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => getPostComments(postId),
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>) => createComment(newComment),
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteCommet',
  async (commentId: number) => deleteComment(commentId),
);

const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });

    builder
      .addCase(addCommentAsync.pending, (state) => {
        state.hasError = false;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, (state) => {
        state.hasError = true;
      });

    builder
      .addCase(deleteCommentAsync.pending, (state, action) => {
        state.hasError = false;
        state.items = state.items.filter(item => item.id !== action.meta.arg);
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const selectComments = (state: RootState) => state.comments;

export default CommentsSlice.reducer;
