/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// createComment, deleteComment
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

export interface UsersState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  comments: [],
  status: 'idle',
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/PostComments',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/DeleteComments',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.status = 'failed';
      })
      .addCase(addCommentAsync.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(addCommentAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { changeComments } = commentsSlice.actions;
export default commentsSlice.reducer;
