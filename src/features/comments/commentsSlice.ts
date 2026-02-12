/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addCommentThunk = createAsyncThunk(
  'comments/addComment',
  async ({ postId, data }: { postId: number; data: CommentData }) => {
    const newComment = await createComment({
      ...data,
      postId,
    });

    return newComment;
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.items = [];
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(
          commment => commment.id !== action.payload,
        );
      });
  },
});

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
