/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(initComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
