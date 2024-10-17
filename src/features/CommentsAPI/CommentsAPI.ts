/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

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

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const deleteCommentAPI = createAsyncThunk(
  'comment/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addCommentAPI = createAsyncThunk(
  'comments/addComment',
  async (CommentData: {
    name: string;
    email: string;
    body: string;
    postId: number;
  }) => {
    const response = await createComment(CommentData);

    return response;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });

    builder.addCase(addCommentAPI.pending, state => {
      // eslint-disable-next-line no-console
      console.log(state.comments);
    });

    builder.addCase(addCommentAPI.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(addCommentAPI.rejected, state => {
      state.error = 'Error';
    });

    builder.addCase(deleteCommentAPI.pending, state => {
      state.loading = true;
    });

    builder.addCase(deleteCommentAPI.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.loading = false;
    });

    builder.addCase(deleteCommentAPI.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
