import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export const initComments = createAsyncThunk(
  'comments/init',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => commentsApi.createComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => commentsApi.deleteComment(commentId),
);

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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(initComments.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(initComments.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.meta.arg),
      }));
  },
});

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
