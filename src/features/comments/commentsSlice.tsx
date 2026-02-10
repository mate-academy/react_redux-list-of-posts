import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
  add: {
    addHasError: false,
    addLoaded: false,
  },
  delete: {
    deleteHasError: false,
    deleteLoaded: false,
  },
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const fetchAddComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const fetchDeleteComment = createAsyncThunk(
  'comments/delete',
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
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
      state.hasError = false;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(fetchAddComment.pending, state => {
      state.add.addHasError = false;
    });

    builder.addCase(fetchAddComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.add.addHasError = false;
      state.add.addLoaded = true;
    });

    builder.addCase(fetchAddComment.rejected, state => {
      state.add.addHasError = true;
    });

    builder.addCase(fetchDeleteComment.pending, state => {
      state.delete.deleteHasError = false;
    });

    builder.addCase(fetchDeleteComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.delete.deleteHasError = false;
      state.delete.deleteLoaded = true;
    });

    builder.addCase(fetchDeleteComment.rejected, state => {
      state.delete.deleteHasError = true;
    });
  },
});
