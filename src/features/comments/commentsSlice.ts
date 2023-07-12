/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { NewComment, createComment, getPostComments } from '../../api/comments';

export interface CommentsState {
  comments: Comment[],
  isLoading: boolean,
  isError: boolean,
  isSubmitting: boolean,
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
  isSubmitting: false,
};

export const getCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addCommentsAsync = createAsyncThunk(
  'comments/addComments',
  (data: NewComment) => createComment(data),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delete: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(getCommentsAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addCommentsAsync.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(addCommentsAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isSubmitting = false;
      })
      .addCase(addCommentsAsync.rejected, (state) => {
        state.isError = true;
        state.isSubmitting = false;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
