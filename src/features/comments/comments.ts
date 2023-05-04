/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../../app/store';
import { createComment, deleteComment } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  commentToDelete: Comment | null,
  commentToPost: CommentData | null,
};
const initialState: InitialStateType = {
  status: 'idle',
  commentToDelete: null,
  commentToPost: null,
};

export const postCommentAsync = createAsyncThunk(
  'comment/postComments',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comment/deleteComments',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(postCommentAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCommentAsync.fulfilled, (
        state, action: PayloadAction<Omit<Comment, 'id'>>,
      ) => {
        state.status = 'idle';
        state.commentToPost = action.payload;
      })
      .addCase(postCommentAsync.rejected, (state) => {
        state.status = 'failed';
      })
    //   .addCase(deleteCommentAsync.pending, (state) => {
    //     state.status = 'loading';
    //   })
      .addCase(deleteCommentAsync.fulfilled, (
        state,
      ) => {
        state.status = 'idle';
        // state.commentToDelete = action.payload;
      })
      .addCase(deleteCommentAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default commentSlice.reducer;
