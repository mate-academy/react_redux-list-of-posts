/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments', (id: number) => {
    return commentsApi.getPostComments(id);
  },
);

export const initAddComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

export const initRemoveComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

type State = {
  comments: Comment[],
  loaded: boolean,
  submitLoaded: boolean,
  error: string | null,
};

const initialState: State = {
  comments: [],
  loaded: false,
  submitLoaded: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.error = 'error';
      });

    builder
      .addCase(initAddComment.pending, (state) => {
        state.error = null;
        state.submitLoaded = false;
      })
      .addCase(initAddComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.submitLoaded = true;
      })

      .addCase(initAddComment.rejected, (state) => {
        state.submitLoaded = true;
        state.error = 'Something went wrong';
      })

      .addCase(initRemoveComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter((comment) => comment.id !== action.payload);
      });
  },
});

export const {
  setComments,
  removeComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
