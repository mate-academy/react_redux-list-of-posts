import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';

import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  isLoaded: boolean;
  isButtonLoading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoaded: false,
  isButtonLoading: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addComments = createAsyncThunk(
  'comment/addComment',
  async (data: CommentData) => {
    const response = await createComment(data);

    return response;
  },
);

export const deleteComments = createAsyncThunk(
  'comment/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoaded = true;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.isLoaded = false;
      })
      .addCase(initComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.isLoaded = false;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        // eslint-disable-next-line no-param-reassign
        state.isButtonLoading = false;
      })
      .addCase(addComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isButtonLoading = true;
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentSlice.reducer;
