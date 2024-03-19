/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const getCommentPosts = createAsyncThunk(
  'comments/get',
  (id: number) => {
    return getPostComments(id);
  },
);

export const commentCreator = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const commentDeleter = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteCom: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentPosts.pending, state => {
        state.loading = true;
      })
      .addCase(getCommentPosts.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(getCommentPosts.rejected, state => {
        state.loading = false;
        state.error = 'error';
      })
      .addCase(commentCreator.pending, state => {
        state.loading = true;
      })
      .addCase(commentCreator.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(commentCreator.rejected, state => {
        state.loading = false;
        state.error = 'error';
      })
      .addCase(commentDeleter.pending, state => {
        state.loading = true;
      })
      .addCase(commentDeleter.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(commentDeleter.rejected, state => {
        state.loading = false;
        state.error = 'error';
      });
  },
});

export const { addComment, deleteCom } = commentSlice.actions;
export default commentSlice.reducer;
