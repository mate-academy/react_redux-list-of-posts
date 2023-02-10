/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface CommentsState {
  loaded: boolean
  hasError: boolean
  items: Comment[]
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const response = await createComment(comment);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state) => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.meta.arg);
      });
  },
});

export default commentsSlice.reducer;
