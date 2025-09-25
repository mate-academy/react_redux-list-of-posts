import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import { RootState } from '../app/store';

interface CommentState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const loadPostComments = createAsyncThunk(
  'comments/fetch',

  async (postId: number) => {
    return getPostComments(postId);
  },
);

/* eslint-disable no-param-reassign */
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadPostComments.fulfilled, state => {
      state.loaded = true;
      state.hasError = false;
    });
    builder.addCase(loadPostComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addComment, removeComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;
