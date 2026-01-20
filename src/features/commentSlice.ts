/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export interface CommentsState {
  items: Comment[] | null;
  loaded: boolean;
  hasError: boolean;
  optimisticallyRemoved: Record<number, { item: Comment; index: number }>;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  optimisticallyRemoved: {},
};

export const initPostsComments = createAsyncThunk(
  'comments/initPostsComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export type AddCommnetProps = CommentData & {
  selectedPostId: number;
};

export const addComment = createAsyncThunk(
  'comments/addComments',
  async ({ name, email, body, selectedPostId }: AddCommnetProps) => {
    const newComment = await createComment({
      name,
      email,
      body,
      postId: selectedPostId,
    });

    return newComment;
  },
);

export const deleteComent = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentOptimistic(state, action) {
      if (!state.items) {
        return;
      }

      state.items.filter(item => item.id !== action.payload);
    },

    restoreComment(state, action) {
      state.items?.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(initPostsComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initPostsComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(initPostsComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.pending, state => {
      state.hasError = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items?.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteComent.pending, (state, action) => {
      if (!state.items) {
        return;
      }

      const id = action.meta.arg;
      const index = state.items?.findIndex(c => c.id === id);

      if (index && index >= 0) {
        state.optimisticallyRemoved[id] = {
          item: state?.items[index],
          index,
        };
      }

      state.items.splice(index, 1);
    });

    builder.addCase(deleteComent.fulfilled, (state, action) => {
      const id = action.meta.arg;

      delete state.optimisticallyRemoved[id];
    });

    builder.addCase(deleteComent.rejected, (state, action) => {
      const id = action.meta.arg;

      const cached = state.optimisticallyRemoved[id];

      if (cached) {
        state.items?.splice(cached.index, 0, cached.item);
      }

      delete state.optimisticallyRemoved[id];

      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
