import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

import * as commentsApi from '../api/comments';

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
  newCommentLoading: boolean;
};

const initialState: InitialState = {
  loaded: true,
  newCommentLoading: false,
  hasError: false,
  comments: [],
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = [...state.comments, action.payload];
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        // eslint-disable-next-line no-param-reassign
        state.comments = action.payload;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      },
    );

    builder.addCase(initComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(addComment.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.newCommentLoading = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = [...state.comments, action.payload];
      // eslint-disable-next-line no-param-reassign
      state.newCommentLoading = false;
    });

    builder.addCase(addComment.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.newCommentLoading = false;
    });

    builder.addCase(deleteCommentFromServer.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export const { actions } = commentsSlice;

export default commentsSlice.reducer;
