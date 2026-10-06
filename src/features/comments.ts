import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

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
  'comments/fetch',
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(loadComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(loadComments.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      // optimistic delete: remove immediately, don't wait for the server
      .addCase(deleteComment.pending, (state, action) => ({
        ...state,
        items: state.items.filter(c => c.id !== action.meta.arg),
      }));
  },
});

export default commentsSlice.reducer;
