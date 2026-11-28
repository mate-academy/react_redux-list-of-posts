import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as deleteCommentApi,
  getPostComments,
} from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  ({ data, postId }: { data: CommentData; postId: number }) => {
    return createComment({
      ...data,
      postId,
    });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
    }),

    removeCommentById: (state, action: PayloadAction<number>) => ({
      ...state,
      items: state.items.filter(comment => comment.id !== action.payload),
    }),
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))

      .addCase(fetchPostComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(fetchPostComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))

      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
        hasError: false,
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }));
  },
});

export const { clearComments, removeCommentById } = commentsSlice.actions;
export default commentsSlice.reducer;
