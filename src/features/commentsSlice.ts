/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsApi.getPostComments(postId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    setCommentsError: (state, action: PayloadAction<string | null>) => {
      state.hasError = action.payload;
    },

    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = null;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loaded = true;
      state.hasError = action.error.message ?? 'Error';
    });
  },
});

export default commentsSlice.reducer;
export const { clearComments, addComment, removeComment, setCommentsError } =
  commentsSlice.actions;
