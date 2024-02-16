/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(create.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      state.items.filter(item => item.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});
export const create = createAsyncThunk('comments/create', (
  newComment: Omit<Comment, 'id'>,
) => {
  return createComment(newComment);
});
export const remove = createAsyncThunk('comments/remove', (
  commentId: number,
) => {
  return deleteComment(commentId);
});
