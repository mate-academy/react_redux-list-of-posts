/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type InitialState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  comments: [],
  loading: false,
  error: '',
};

export const commentsInit = createAsyncThunk(
  'comments/init',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const deleteOldComment = createAsyncThunk<number, number>(
  'comment/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.push(action.payload);
    },
    deleteLocalComment(state, action) {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(commentsInit.pending, state => {
        state.loading = true;
      })
      .addCase(commentsInit.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(commentsInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addNewComment.pending, state => {
        state.loading = true;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(addNewComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add comment';
      })
      .addCase(deleteOldComment.pending, state => {
        state.loading = true;
      })
      .addCase(deleteOldComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(deleteOldComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete comment';
      });
  },
});

export default commentsSlice.reducer;
