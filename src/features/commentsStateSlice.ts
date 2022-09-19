import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

interface CommentsState {
  comments: Comment[],
  isCommentsLoaded: boolean,
  isCommentLoaded: boolean,
  hasError: null | string,
}

const initialState: CommentsState = {
  comments: [],
  isCommentsLoaded: false,
  isCommentLoaded: false,
  hasError: null,
};

export const fetchCommentsByPostId = createAsyncThunk<Comment[], number>(
  'commentsState/fetchCommentsByPostId',
  getPostComments,
);

export const fetchNewComment = createAsyncThunk<
Comment,
Omit<Comment, 'id'>
>(
  'commentsState/fetchNewComment',
  createComment,
);

export const removeCommentFromServer = createAsyncThunk<
Promise<unknown>, number
>(
  'commentsState/removeCommentFromServer',
  deleteComment,
);

export const postsSlice = createSlice({
  name: 'commentsState',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      const commentId = action.payload;

      state.comments = state.comments.filter(comment => (
        comment.id !== commentId
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.isCommentsLoaded = false;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoaded = true;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.hasError = action.error?.message || null;
        state.isCommentsLoaded = true;
      })
      .addCase(fetchNewComment.pending, (state) => {
        state.isCommentLoaded = false;
      })
      .addCase(fetchNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isCommentLoaded = true;
      })
      .addCase(fetchNewComment.rejected, (state, action) => {
        state.hasError = action.error?.message || null;
        state.isCommentLoaded = true;
      })
      .addCase(removeCommentFromServer.pending, (state) => {
        state.isCommentLoaded = false;
      })
      .addCase(removeCommentFromServer.fulfilled, (state) => {
        state.isCommentLoaded = true;
      })
      .addCase(removeCommentFromServer.rejected, (state, action) => {
        state.hasError = action.error?.message || null;
        state.isCommentLoaded = true;
      });
  },
});

export const selectComments = (state: RootState) => state.commentsState;

export const { removeComment } = postsSlice.actions;

export default postsSlice.reducer;
