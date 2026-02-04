/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

type CommentsState = {
  items: Comment[];
  hasError: boolean;

  loaded: boolean;
  adding: boolean;
  deleting: boolean;
};

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
  adding: false,
  deleting: false,
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
    const response = await createComment(newComment);

    return response;
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
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });

    //#endregion

    //#region add
    builder
      .addCase(addCommentFetch.pending, state => {
        state.adding = true;
      })
      .addCase(addCommentFetch.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.adding = false;
      })
      .addCase(addCommentFetch.rejected, state => {
        state.adding = false;
        state.hasError = true;
      });

    //#endregion

    //#region delete
    builder
      .addCase(deleteCommentFetch.pending, state => {
        state.deleting = true;
      })
      .addCase(deleteCommentFetch.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.deleting = false;
      })
      .addCase(deleteCommentFetch.rejected, state => {
        state.deleting = false;
        state.hasError = true;
      });

    //#endregion
  },
});

export default commentsSlice.reducer;
