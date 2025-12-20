/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentApi,
} from '../../api/comments';

/* CREATE COMMENT */
export const create = createAsyncThunk(
  'comments/create',
  async (comment: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(comment);

    return createdComment;
  },
);

/* FETCH COMMENTS */
export const fetchPostComments = createAsyncThunk(
  'comments/fetch',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

/* DELETE COMMENT */
export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

type State = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      /* FETCH */
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })

      /* CREATE */
      .addCase(create.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(create.rejected, state => {
        state.hasError = true;
      })

      /* DELETE */
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const selectCommentState = (state: RootState) => state.comments;
export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
