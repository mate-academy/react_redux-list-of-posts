/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  deleted: boolean;
  hasDeleteError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  deleted: false,
  hasDeleteError: false,
};

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData & { postId: number }) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk<
  number,
  Comment,
  { rejectValue: Comment }
>('comments/removeComment', async (comment, { rejectWithValue }) => {
  try {
    await deleteComment(comment.id);

    return comment.id;
  } catch {
    return rejectWithValue(comment);
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
      state.deleted = false;
      state.hasDeleteError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.pending, (state, action) => {
        const comment = action.meta.arg;

        state.items = state.items.filter(c => c.id !== comment.id);
      })
      .addCase(removeComment.rejected, (state, action) => {
        const comment = action.payload;

        if (comment) {
          state.items.push(comment);
        }
      });
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
