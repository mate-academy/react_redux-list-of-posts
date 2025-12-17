import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface Comments {
  items: Comment[];
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
  items: [],
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
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(commentsAsync.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(commentsAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(commentsAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = [...state.items, action.payload];
    });
    builder.addCase(addCommentAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
