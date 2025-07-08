/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment as dc,
} from '../api/comments';

const initialState = {
  loading: false,
  error: '',
  comments: [] as Comment[],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: Post['id']) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: Comment['id']) => {
    await dc(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = action.payload;
      },
    );
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong!';
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.loading = false;
        state.comments.push(action.payload);
      },
    );
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<Comment['id']>) => {
        state.loading = false;
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      },
    );
  },
});

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
