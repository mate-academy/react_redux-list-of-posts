/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
  visible: boolean;
};
const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
  visible: false,
};

export const loadedComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    showCommentForm: state => {
      state.visible = true;
    },
    hideCommentForm: state => {
      state.visible = false;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    addCommentToState: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadedComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadedComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.visible = false;
      })
      .addCase(loadedComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const {
  showCommentForm,
  hideCommentForm,
  removeComment,
  addCommentToState,
} = commentsSlice.actions;

export default commentsSlice.reducer;
