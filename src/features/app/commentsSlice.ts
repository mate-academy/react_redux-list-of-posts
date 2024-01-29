/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  deleteComment,
  createComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

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

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const deleteing = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const adding = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
    builder.addCase(deleteing.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );
      state.hasError = false;
    });
    builder.addCase(adding.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(
      adding.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.loaded = true;
        state.items = [...state.items, action.payload];
      },
    );
    builder.addCase(adding.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { add } = commentsSlice.actions;
