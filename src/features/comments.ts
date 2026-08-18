import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

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

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/load',
  postId => commentsApi.getPostComments(postId),
);

type NewComment = CommentData & { postId: number };

export const addComment = createAsyncThunk<Comment, NewComment>(
  'comments/add',
  ({ postId, name, email, body }) =>
    commentsApi.createComment({ postId, name, email, body }),
);

export const deleteComment = createAsyncThunk<unknown, number>(
  'comments/delete',
  commentId => commentsApi.deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
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
      .addCase(loadComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        hasError: false,
        items: [...state.items, action.payload],
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(deleteComment.pending, (state, action) => ({
        ...state,
        hasError: false,
        items: state.items.filter(comment => comment.id !== action.meta.arg),
      }))
      .addCase(deleteComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export default commentsSlice.reducer;
