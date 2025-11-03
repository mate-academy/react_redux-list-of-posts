import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';
/* eslint-disable no-param-reassign */

export const loadCommentsThunk = createAsyncThunk<Comment[], number>(
  'comments/load',
  async postId => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addCommentThunk = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/addComment',
  async newComment => {
    const comment = await createComment(newComment);

    return comment;
  },
);

export const deleteCommentThunk = createAsyncThunk<number, number>(
  'comment/deleteComment',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
  currentPostId: number | null;
};

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
  currentPostId: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCurrentPostId(state, action: PayloadAction<number | null>) {
      // eslint-disable-next-line no-param-reassign
      state.currentPostId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCommentsThunk.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadCommentsThunk.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadCommentsThunk.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteCommentThunk.pending, (state, action) => {
      const commentId = action.meta.arg;

      state.items = state.items.filter(item => item.id !== commentId);
    });

    builder.addCase(deleteCommentThunk.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { setCurrentPostId } = commentsSlice.actions;
export default commentsSlice.reducer;
