import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => commentsApi.createComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => ({
      ...state,
      hasError: false,
      loading: true,
    }));
    builder.addCase(fetchComments.fulfilled, (state, action) => ({
      ...state,
      hasError: false,
      comments: action.payload,
      loading: false,
    }));
    builder.addCase(fetchComments.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }));
  },
});

export default commentsSlice.reducer;
