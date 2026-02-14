/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentInput } from '../../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../../api/comments';

export interface SetCommentInterface {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: SetCommentInterface = {
  items: [],
  loaded: false,
  hasError: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/getCommentsAsync',
  async (commentId: number) => {
    const postComments = await getPostComments(commentId);

    return postComments;
  },
);

export const addCommentsAsync = createAsyncThunk<Comment, CommentInput>(
  'comments/addCommentsAsync',
  async data => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deleteCommentsAsync = createAsyncThunk(
  'comments/deleteCommentsAsync',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addCommentsAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentsAsync.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteCommentsAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentSlice.reducer;
