/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment } from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { AppDispatch, RootState } from '../../app/store';
import { setPostComments } from '../postDetail/postDetailSlice';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'failed',
  comments: Comment[],
  commentToDeleteId: number | null,
  commentToPost: CommentData | null,
};
const initialState: InitialStateType = {
  status: 'idle',
  comments: [],
  commentToDeleteId: null,
  commentToPost: null,
};

export const postCommentAsync = createAsyncThunk(
  'comment/postComments',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
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
      });
  },
});

export default commentSlice.reducer;

export const deleteCommentById = (commentId: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setPostComments(
      getState().comments.comments.filter(comment => comment.id !== commentId),
    ));

    await deleteComment(commentId);
  };
};
