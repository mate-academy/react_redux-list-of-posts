/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

//thunk

export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',

  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const createCommentForPost = createAsyncThunk(
  'comments/createCommentForPost',

  async (data: Omit<Comment, 'id'>) => {
    const response = await createComment(data);

    return response;
  },
);

export const deleteCommentById = createAsyncThunk(
  'comments/deleteCommentById',
  async (id: number) => {
    await deleteComment(id);

    return id; // вернём id, чтобы потом убрать из state
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  loading: boolean;
  hasError: boolean;
  loadedComment: boolean;
  errorAddingComment: boolean;
  commentDeleted: boolean;
  deleteError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  loading: false,
  hasError: false,
  loadedComment: false,
  errorAddingComment: false,
  commentDeleted: false,
  deleteError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // fetching comments by post
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.loaded = true;
        state.loading = false;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = false;
        state.loading = false;
        state.hasError = true;
      });
    // creating comment for post
    builder
      .addCase(createCommentForPost.pending, state => {
        state.loadedComment = false;
        state.errorAddingComment = false;
      })
      .addCase(createCommentForPost.fulfilled, (state, action) => {
        state.loadedComment = true;
        state.errorAddingComment = false;
        state.items.push(action.payload);
      })
      .addCase(createCommentForPost.rejected, state => {
        state.loadedComment = false;
        state.errorAddingComment = true;
      });
    // delete the comment
    builder
      .addCase(deleteCommentById.pending, state => {
        state.commentDeleted = false;
        state.deleteError = false;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.commentDeleted = true;
        state.deleteError = false;
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCommentById.rejected, state => {
        state.commentDeleted = false;
        state.deleteError = true;
      });
  },
});
