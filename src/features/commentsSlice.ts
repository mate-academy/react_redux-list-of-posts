/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const initComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },

    removeComments: (state) => {
      state.comments = [];
    },

    setErrorComment: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(initComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })

      .addCase(initComments.rejected, (state) => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export const {
  setComments,
  removeComments,
  removeComment,
  setErrorComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
