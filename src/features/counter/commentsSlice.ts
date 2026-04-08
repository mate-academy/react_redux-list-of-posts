/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchCommentsThunk = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
    return getPostComments(postId);
  },
);

export const createCommentThunk = createAsyncThunk<
Comment,
Omit<Comment, 'id'>
>('comments/create', async data => {
  return createComment(data);
});

export const deleteCommentThunk = createAsyncThunk<number, number>(
  'comments/delete',
  async id => {
    await deleteComment(id);

    return id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      // GET
      .addCase(fetchCommentsThunk.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Error';
      })

      // CREATE
      .addCase(createCommentThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // DELETE
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
