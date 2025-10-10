/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

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

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const fetchCommentsAsync = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async postId => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchCommentsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(createCommentAsync.pending, state => {
        state.hasError = false;
      })
      .addCase(createCommentAsync.rejected, state => {
        state.hasError = true;
      })
      .addCase(deleteCommentAsync.pending, state => {
        state.hasError = false;
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { setCommentsError } = commentsSlice.actions;
