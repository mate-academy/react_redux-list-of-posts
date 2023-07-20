/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const getCommentsByPostId = createAsyncThunk(
  'posts/fetch', (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/create',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(getCommentsByPostId.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })

    .addCase(
      getCommentsByPostId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.isLoading = false;
      },
    )

    .addCase(getCommentsByPostId.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(createNewComment.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })

    .addCase(
      createNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments = [...state.comments, action.payload];
        state.isLoading = false;
      },
    )

    .addCase(createNewComment.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(
      deleteCommentById.pending,
      (state, action) => {
        state.comments = state.comments.filter(comment => {
          return comment.id !== action.meta.arg;
        });
      },
    )

    .addCase(
      deleteCommentById.rejected,
      (state) => {
        state.hasError = true;
      },
    ),
});

export default commentsSlice.reducer;
