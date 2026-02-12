/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (commentData: CommentData & { postId: number }) => {
    const comment = await createComment(commentData);

    return comment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchCommentsByPost.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.hasError = false;
          state.comments = action.payload;
        },
      )
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        createCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )
      .addCase(createCommentAsync.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        deleteCommentAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
