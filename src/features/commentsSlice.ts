/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const getCommentsPost = createAsyncThunk(
  'comments/fetchComments',
  (id: number) => getPostComments(id),
);

export const addCommentsPost = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deleteCommentsPost = createAsyncThunk(
  'comments/deleteComments',
  (commentId: number) => deleteComment(commentId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCurrComment: (
      state: CommentsState,
      action: PayloadAction<number>,
    ) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentsPost.pending, state => {
        state.loaded = false;
      })
      .addCase(
        getCommentsPost.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loaded = true;
        },
      )
      .addCase(getCommentsPost.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addCommentsPost.pending, (state: CommentsState) => {
        state.loaded = true;
      })
      .addCase(
        addCommentsPost.fulfilled,
        (state: CommentsState, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
          state.loaded = true;
        },
      )
      .addCase(addCommentsPost.rejected, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(deleteCommentsPost.pending, (state: CommentsState) => {
        state.loaded = true;
      })
      .addCase(deleteCommentsPost.fulfilled, (state: CommentsState, action) => {
        state.comments = state.comments.filter(comment => {
          return comment.id !== action.payload;
        });
        state.loaded = true;
      })
      .addCase(deleteCommentsPost.rejected, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { deleteCurrComment } = commentsSlice.actions;
export default commentsSlice.reducer;
