import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/commentsApi';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadCommentsByPosts = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  async (newComment: Comment) => {
    return createComment(newComment);
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadCommentsByPosts.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        loadCommentsByPosts.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addCase(loadCommentsByPosts.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addNewComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        addNewComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items = [...state.items, action.payload];
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addCase(addNewComment.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentById.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.meta.arg);
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(deleteCommentById.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { setError } = commentsSlice.actions;

export default commentsSlice.reducer;
