/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentFetch = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const deleteCommentFetch = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //#region fetch
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
    //#endregion

    //#region add
    builder
      .addCase(addCommentFetch.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(addCommentFetch.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
      })
      .addCase(addCommentFetch.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
    //#endregion

    //#region delete
    builder
      .addCase(deleteCommentFetch.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.loaded = true;
      })
      .addCase(deleteCommentFetch.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
    //#endregion
  },
});

export default commentsSlice.reducer;
