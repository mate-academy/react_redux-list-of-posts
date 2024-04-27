/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

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

export const initComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => deleteComment(commentId),
);

let oldComments: Comment[] = [];

export const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(initComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      // .addCase(removeComment.fulfilled, (state, action) => {
      //   // state.comments = state.comments.filter(
      //   //   comment => comment.id !== action.payload,
      //   // );
      // })
      .addCase(removeComment.pending, (state, action) => {
        oldComments = [...state.comments];

        console.log('remove item', state.comments, action);

        state.comments = state.comments.filter(
          comment => comment.id !== action.meta.arg,
        );
      })
      .addCase(removeComment.rejected, state => {
        console.log('oldComments', oldComments);

        state.comments = oldComments;
      });
  },
});

export default commentsSlice.reducer;
