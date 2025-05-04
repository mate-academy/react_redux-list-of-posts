import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);
/* eslint-disable no-param-reassign */
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.hasError = false;
      state.loaded = false;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});
/* eslint-enable no-param-reassign */
export const { clearComments, addComment, deleteComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
