/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  comments: Comment[];
  hasError: boolean;
};

const initialState: CommentsState = {
  loaded: false,
  comments: [],
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<Comment>) {
      state.comments.push(payload);
    },
    removeComment(state, { payload }: PayloadAction<number>) {
      state.comments = state.comments.filter(item => item.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
