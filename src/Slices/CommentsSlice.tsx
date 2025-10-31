/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, ...data }: CommentData & { postId: number }) => {
    return commentsApi.createComment({ postId, ...data });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
  visible: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    toggleVisible: state => {
      state.visible = !state.visible;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.visible = false;
      })
      .addCase(
        loadComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loaded = true;
        },
      )
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })

      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )

      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(c => c.id !== action.payload);
        },
      );
  },
});

export const { toggleVisible } = commentsSlice.actions;
export default commentsSlice.reducer;
