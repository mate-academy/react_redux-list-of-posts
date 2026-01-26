import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

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

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchByPost',
  async (postId: number) => commentsApi.getPostComments(postId),
);

export const addCommentToPost = createAsyncThunk(
  'comments/add',
  async (payload: { postId: number; data: CommentData }) => {
    const { postId, data } = payload;

    return commentsApi.createComment({ ...data, postId });
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    removeCommentOptimistic: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addCommentToPost.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export const { clearComments, removeCommentOptimistic } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;
