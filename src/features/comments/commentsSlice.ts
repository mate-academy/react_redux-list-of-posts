import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';

import type { Comment, CommentData } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  commentsApi.getPostComments,
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: CommentData & { postId: number }) => commentsApi.createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (id: number) => {
    await commentsApi.deleteComment(id);

    return id;
  },
);

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
  requestId: string | null;
  postId: number | null;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
  requestId: null,
  postId: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => ({
      ...initialState,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        return {
          ...state,
          loaded: false,
          hasError: false,
          items: [],
          postId: action.meta.arg,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          items: action.payload,
          loaded: true,
          hasError: false,
          requestId: null,
        };
      })
      .addCase(fetchComments.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) {
          return state;
        }

        return {
          ...state,
          loaded: true,
          hasError: true,
          requestId: null,
        };
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.postId !== action.meta.arg.postId) {
          return state;
        }

        return {
          ...state,
          items: [...state.items, action.payload],
        };
      })
      .addCase(addComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      })
      .addCase(removeComment.rejected, state => {
        return {
          ...state,
          hasError: true,
        };
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
