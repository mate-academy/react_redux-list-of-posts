/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
  loading: boolean
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
  loading: false,
};

export const fetchComments = createAsyncThunk('comments/fetch',
  async (postId: number) => {
    const fetchedComments = await getPostComments(postId);

    return fetchedComments;
  });

export const makeComments = createAsyncThunk('comments/create',
  async (data: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(data);

    return createdComment;
  });

export const removeComment = createAsyncThunk('comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (
      state: CommentsState,
      action: PayloadAction<Comment>,
    ) => {
      state.items.push(action.payload);
    },

    removeComment: (state: CommentsState, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },

    clearComments: (state: CommentsState) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(makeComments.pending, (state: CommentsState) => {
        state.loading = true;
      })
      .addCase(makeComments.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(removeComment.fulfilled, (state: CommentsState,
        action: PayloadAction<number>) => {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      });
  },
});
