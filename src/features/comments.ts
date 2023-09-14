/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-len */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: State = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk('comments/add', (newComment: Comment, { dispatch }) => {
  dispatch(add(newComment));

  return createComment(newComment);
});

export const removeComment = createAsyncThunk('comments/delete', (commentId: number, { dispatch }) => {
  dispatch(remove(commentId));

  return deleteComment(commentId);
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const { add, remove } = commentsSlice.actions;
export default commentsSlice.reducer;
