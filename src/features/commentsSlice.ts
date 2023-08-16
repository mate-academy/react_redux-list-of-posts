/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addComment.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = false;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(removeComment.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loaded = false;
    });

    builder.addCase(removeComment.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { setComments, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
