import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  adding: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  adding: false,
  error: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const add = createAsyncThunk(
  'comments/create',
  async ({ comment, postId }: { comment: CommentData; postId: number }) => {
    const newComment = await createComment({
      ...comment,
      postId,
    });

    return newComment;
  },
);

export const commentDelete = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const CommentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    // add comment
    builder.addCase(add.pending, state => {
      state.adding = true;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.adding = false;
    });

    builder.addCase(add.rejected, state => {
      state.adding = false;
    });

    // delete comment
    builder.addCase(commentDelete.pending, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.meta.arg,
      );
    });
  },
});

export default CommentSlice.reducer;
