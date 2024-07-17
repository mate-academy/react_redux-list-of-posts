/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Comments = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: Comments = {
  items: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
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
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      },
    );

    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
