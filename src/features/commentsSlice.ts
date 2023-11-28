/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const commentsFromServer = await commentsApi.getPostComments(postId);

    return commentsFromServer;
  },
);

export const addAsync = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment(comment);

    return newComment;
  },
);

export const removeAsync = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },

  extraReducers: builder => {
    builder.addCase(
      init.pending,
      state => {
        state.hasError = false;
        state.loaded = false;
      },
    );

    builder.addCase(
      init.fulfilled,
      (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(
      init.rejected,
      state => {
        state.hasError = true;
        state.loaded = true;
      },
    );

    builder.addCase(
      addAsync.fulfilled,
      (state, action) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(
      addAsync.rejected,
      state => {
        state.hasError = true;
      },
    );
  },
});

export default commentsSlice.reducer;
export const { remove } = commentsSlice.actions;
