import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Comment[],
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadComments.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });

    builder.addCase(addComment.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      return { ...state, items: [...state.items, payload], loaded: true };
    });
    builder.addCase(addComment.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });

    builder.addCase(removeComment.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(removeComment.fulfilled, (state, { meta }) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== meta.arg),
        loaded: true,
      };
    });
    builder.addCase(removeComment.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
