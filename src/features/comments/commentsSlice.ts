import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId)
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => commentsApi.createComment(data)
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
    return commentId;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(initComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
