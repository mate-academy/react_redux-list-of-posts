import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchCommentsByPost',
  async postId => commentsApi.getPostComments(postId),
);

export const createPostComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/createPostComment',
  async commentData => commentsApi.createComment(commentData),
);

export const deletePostComment = createAsyncThunk<number, number>(
  'comments/deletePostComment',
  async commentId => {
    await commentsApi.deleteComment(commentId);
    return commentId;
  },
);

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(fetchCommentsByPost.rejected, state => ({
        ...state,
        items: [],
        loaded: true,
        hasError: true,
      }))
      .addCase(createPostComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(createPostComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(deletePostComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }))
      .addCase(deletePostComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
