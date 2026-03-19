import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

interface CommentsState {
  loading: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loading: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => ({
        ...state,
        loading: true,
        hasError: false,
        items: [],
      }))
      .addCase(loadComments.rejected, state => ({
        ...state,
        loading: false,
        hasError: true,
      }))
      .addCase(loadComments.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        hasError: false,
        items: action.payload,
      }))
      .addCase(addComment.pending, state => ({
        ...state,
        hasError: false,
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        hasError: false,
        items: [...state.items, action.payload],
      }))
      .addCase(removeComment.pending, state => ({
        ...state,
        hasError: false,
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        hasError: false,
        items: state.items.filter(item => item.id !== action.payload),
      }));
  },
});

export const { reducer: commentsReducer } = commentsSlice;
