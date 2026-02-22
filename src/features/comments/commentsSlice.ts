import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchCommentsByPost = createAsyncThunk<Comment[], number>(
  'comments/fetchByPost',
  async postId => {
    const res = await fetch(`/api/comments.json?postId=${postId}`);

    if (!res.ok) {
      throw new Error('Failed to load comments');
    }

    return res.json();
  },
);

export const deleteComment = createAsyncThunk<number, number>(
  'comments/delete',
  async commentId => {
    // якщо в тебе фейк-API — можна просто повертати id
    // або робити реальний DELETE
    // await api.deleteComment(commentId);
    return commentId;
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async data => {
    // const created = await api.createComment(data);
    // return created;
    const res = await fetch(`/api/comments.json`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCommentsByPost.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;

export const selectComments = (s: { comments: CommentsState }) =>
  s.comments.items;
export const selectCommentsLoaded = (s: { comments: CommentsState }) =>
  s.comments.loaded;
export const selectCommentsHasError = (s: { comments: CommentsState }) =>
  s.comments.hasError;
