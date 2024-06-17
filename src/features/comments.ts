import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

/* eslint-disable no-param-reassign */

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const create = createAsyncThunk('comments/post', (data: Comment) => {
  return createComment(data);
});

export const remove = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

type CommentsType = {
  items: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isCreating: boolean;
};

const initialState: CommentsType = {
  items: [],
  isLoading: false,
  hasError: false,
  isCreating: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeOptimistically: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    revertRemove: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(create.pending, state => {
      state.isCreating = true;
    });

    builder.addCase(create.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.isCreating = false;
    });

    builder.addCase(create.rejected, state => {
      state.hasError = true;
      state.isCreating = false;
    });

    builder.addCase(remove.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { removeOptimistically, revertRemove } = commentsSlice.actions;

export default commentsSlice.reducer;
