import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface Comments {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

export interface NewCommentData {
  name: string;
  email: string;
  body: string;
  postId: number;
}

const initialState: Comments = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/add',
  ({ name, email, body, postId }: NewCommentData) => {
    return commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(commentsAsync.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(commentsAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = action.payload;
    });
    builder.addCase(commentsAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(addCommentAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
