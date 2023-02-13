/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(createComment.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(
      createComment.fulfilled,
      (state, action) => {
        state.comments.push(action.payload);
      },
    );
  },
});

export const { remove } = commentsSlice.actions;

export default commentsSlice.reducer;

export const init = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => commentsApi.getPostComments(postId),
);

export const createComment = createAsyncThunk(
  'comments/fetch_add',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await commentsApi.createComment(comment);

    return newComment;
  },
);
