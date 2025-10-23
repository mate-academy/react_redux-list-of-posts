/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

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

export const fetchCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchCommentsByPost',
  async postId => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const createComment = createAsyncThunk<
  Comment,
  { postId: number; data: CommentData }
>('comments/createComment', async ({ postId, data }) => {
  const newComment = await commentsApi.createComment({ ...data, postId });

  return newComment;
});

export const removeComment = createAsyncThunk<number, number>(
  'comments/removeComment',
  async commentId => {
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(
        fetchCommentsByPost.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchCommentsByPost.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })

      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(createComment.rejected, state => {
        state.hasError = true;
      })

      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
