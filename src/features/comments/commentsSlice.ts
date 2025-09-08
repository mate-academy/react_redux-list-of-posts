import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: CommentData & { postId: number }) => commentsApi.createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
export type { CommentsState };
