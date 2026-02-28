/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
// eslint-disable-next-line import/no-cycle

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

export const getCommentsAsync = createAsyncThunk(
  '/comments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  '/comments/delete',
  async (postId: number) => {
    await deleteComment(postId);

    return postId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    updateComments: (state, action: PayloadAction<Comment>) => {
      state.items = [...state.items, action.payload];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getCommentsAsync.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.loaded = false;
        state.items = action.payload;
      })
      .addCase(getCommentsAsync.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      })

      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export const { updateComments } = commentsSlice.actions;

export default commentsSlice.reducer;
