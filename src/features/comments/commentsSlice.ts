/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment as removeCommentApi,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
}

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await removeCommentApi(commentId);

    return commentId;
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.hasError = false;
      state.loaded = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.items = [];
      })

      .addCase(addComment.pending, state => {
        state.hasError = false;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })

      .addCase(removeComment.pending, state => {
        state.hasError = false;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(item => item.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
