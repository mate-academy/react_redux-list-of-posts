/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  comments: Comment[]
  loading: boolean,
  hasError: boolean,
}

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const res = await getPostComments(postId);

    return res;
  },
);

export const addPostComment = createAsyncThunk(
  'comments/addPostComment',
  async (data: Omit<Comment, 'id'>) => {
    const res = await createComment(data);

    return res;
  },
);

export const removePostComment = createAsyncThunk(
  'comments/removePostComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loading = false;
      });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.hasError = true;
      state.loading = false;
    });

    builder.addCase(addPostComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.hasError = false;
      });
    builder.addCase(addPostComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(removePostComment.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
