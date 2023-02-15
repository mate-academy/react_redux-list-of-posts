/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

export interface CommentSlice {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  changingStatus: 'idle' | 'posting' | 'postingFailed';
  deletedCommentId: number[],
}
const initialState: CommentSlice = {
  comments: [],
  status: 'idle',
  changingStatus: 'idle',
  deletedCommentId: [],
};

export const loadComments = createAsyncThunk(
  'comments/SET',
  (async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  }),
);

export const addComment = createAsyncThunk(
  'comments/POST',
  (async (comment: Comment) => {
    const response = await createComment(comment);

    return response;
  }),
);

export const removeComment = createAsyncThunk(
  'comments/DELETE',
  (async (commentId: number) => {
    const response = await deleteComment(commentId);

    return response;
  }),
);

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setDeletedCommentId: (state, action: PayloadAction<number>) => {
      state.deletedCommentId = [...state.deletedCommentId, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      })
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addComment.pending, (state) => {
        state.changingStatus = 'posting';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.changingStatus = 'idle';
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addComment.rejected, (state) => {
        state.changingStatus = 'postingFailed';
      });
  },
});

export const { setDeletedCommentId } = CommentsSlice.actions;
export const getComments = (state: RootState) => state.comments;
export default CommentsSlice.reducer;
