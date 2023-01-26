/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const commentsState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const loadComents = createAsyncThunk(
  'load/comments',
  commentsApi.getPostComments,
);

export const addComment = createAsyncThunk(
  'add/comments',
  commentsApi.createComment,
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsState as State,
  reducers: {
    filteComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    showError: (state) => {
      state.hasError = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadComents.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      loadComents.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.comments = action.payload;
      },
    );

    builder.addCase(
      loadComents.rejected,
      (state) => {
        state.loaded = true;
        state.hasError = true;
      },
    );

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(
      addComment.rejected,
      (state) => {
        state.hasError = true;
      },
    );
  },

});

export const { filteComments, showError } = commentsSlice.actions;
export default commentsSlice.reducer;
