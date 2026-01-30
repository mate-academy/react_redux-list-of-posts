/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/getPostComments',
  async postId => {
    const items = await getPostComments(postId);

    return items;
  },
);
export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async data => {
    const item = await createComment(data);

    return item;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async id => {
    await deleteComment(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(createCommentAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.pending, state => {
        state.loaded = true;
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deleteCommentAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { clear } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsLoaded = (state: RootState) => state.comments.loaded;
export const selectCommentsHasError = (state: RootState) =>
  state.comments.hasError;

export default commentsSlice.reducer;
