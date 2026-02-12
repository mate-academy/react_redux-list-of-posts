import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type Init = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  submitting: boolean;
};

const initialState: Init = {
  loaded: false,
  hasError: false,
  comments: [],
  submitting: false,
};

export const setPostComments = createAsyncThunk(
  'fetch/commentsByID',
  (id: number) => {
    return getPostComments(id);
  },
);

export const addPostComment = createAsyncThunk(
  'createComment/commentsByID',
  ({
    name,
    email,
    body,
    postId,
  }: {
    name: string;
    email: string;
    body: string;
    postId: number;
  }) => {
    return createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const deletePostComment = createAsyncThunk(
  'deleteComment/commentsByID',
  (id: number) => {
    return deleteComment(id);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCurrentComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(setPostComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(
      setPostComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      },
    );

    builder.addCase(setPostComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(addPostComment.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.submitting = true;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });

    builder.addCase(
      addPostComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        // eslint-disable-next-line no-param-reassign
        state.submitting = false;
        state.comments.push(action.payload);
      },
    );

    builder.addCase(addPostComment.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });

    builder.addCase(deletePostComment.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    });

    builder.addCase(deletePostComment.fulfilled, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(deletePostComment.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export const { deleteCurrentComment } = commentsSlice.actions;
