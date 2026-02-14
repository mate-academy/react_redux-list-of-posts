/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  postId => {
    const response = getPostComments(postId);

    return response;
  },
);

const initialState: {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
} = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },

    removeComment: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    },

    clearComments: state => {
      state.comments = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;

          state.comments = [...state.comments, ...action.payload];
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setComments, removeComment, clearComments } =
  commentsSlice.actions;

export default commentsSlice.reducer;
