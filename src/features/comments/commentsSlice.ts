import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addCommentThunk = createAsyncThunk(
  'comments/fetchPost',
  async ({ name, email, body, postId }: CommentData & { postId: number }) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/fetchDelete',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(initComments.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(initComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });
    builder.addCase(addCommentThunk.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });

    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});
