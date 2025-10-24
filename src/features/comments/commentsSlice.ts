/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getPostComments, createComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import type { RootState } from '../../app/store';

// ----------------------------------------------------------------------
// THUNKS
// ----------------------------------------------------------------------

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (postId: number) => {
    // <--- Tipo 'number' adicionado explicitamente
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addNewComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/addNewComment',
  async newCommentData => {
    const createdComment = await createComment(newCommentData);

    return createdComment;
  },
);

// ----------------------------------------------------------------------
// SLICE
// ----------------------------------------------------------------------

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentDeleted: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    // Adicione actions síncronas se necessário
  },

  extraReducers: builder => {
    builder
      // FETCH COMMENTS: Pending
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      // FETCH COMMENTS: Fulfilled
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      // FETCH COMMENTS: Rejected
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      })
      // ADD NEW COMMENT: Fulfilled
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { commentDeleted } = commentsSlice.actions;

export default commentsSlice.reducer;

// ----------------------------------------------------------------------
// SELETORES
// ----------------------------------------------------------------------

export const selectComments = (state: RootState): Comment[] =>
  state.comments.items;
export const selectCommentsLoaded = (state: RootState): boolean =>
  state.comments.loaded;
export const selectCommentsHasError = (state: RootState): boolean =>
  state.comments.hasError;
