/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { addComment, commentFetch } from '../thunks/commentsThunk';

type CommentState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commentFetch.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(commentFetch.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(commentFetch.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
      state.comments = [];
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
