import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (comment: Comment) => {
    await deleteComment(comment.id);

    return comment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(loadComments.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(loadComments.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(removeComment.pending, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.meta.arg.id),
      }))
      .addCase(removeComment.rejected, (state, action) => ({
        ...state,
        items: [...state.items, action.meta.arg],
      }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
