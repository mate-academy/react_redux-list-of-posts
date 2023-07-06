/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    try {
      const data = await getPostComments(postId);

      return data;
    } catch {
      throw new Error();
    }
  },
);

export const addComment = createAsyncThunk(
  'comments/addComments',
  async (data: Omit<Comment, 'id'>) => {
    const res = await createComment(data);

    return res;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => (
          comment.id !== action.meta.arg
        ));
      })
      .addCase(removeComment.rejected, (state) => {
        state.hasError = true;
      });

    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
