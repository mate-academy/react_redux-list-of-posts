/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comment: Comment[],
  commentError: string,
  commentLoad: boolean,
};

const initialState: CommentsState = {
  comment: [],
  commentError: '',
  commentLoad: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNew(state, action: PayloadAction<Comment>) {
      state.comment.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<number>) {
      state.comment = state.comment.filter(el => el.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(comments.pending, state => {
        state.commentLoad = true;
      })
      .addCase(comments.fulfilled, (state, action) => {
        state.commentLoad = false;
        state.comment = action.payload;
      })
      .addCase(comments.rejected, state => {
        state.commentLoad = false;
        state.commentError = 'Error';
      });
  },
});

export default commentsSlice.reducer;

export const { addNew, deleteComment } = commentsSlice.actions;

export const comments = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});
