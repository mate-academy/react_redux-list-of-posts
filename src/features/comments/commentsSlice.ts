/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: state => {
      state.comments = [];
    },

    add: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = 'Error';
      state.loaded = true;
    });

    builder.addCase(removeComment.pending, (state, action) => {
      state.comments = state.comments.filter(
        item => item.id !== action.meta.arg,
      );
    });

    builder.addCase(removeComment.rejected, state => {
      state.hasError = 'Error';
    });
  },
});

export default commentsSlice.reducer;
export const { clear, add } = commentsSlice.actions;
