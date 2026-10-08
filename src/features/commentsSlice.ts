/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

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

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    showError: state => {
      state.hasError = true;
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default comments.reducer;
export const { actions } = comments;
