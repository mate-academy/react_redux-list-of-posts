import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: CommentData & { postId: number }) => commentsApi.createComment(data),
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsReducer = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, (state: CommentState) => {
      state.loaded = false;
      state.items = [];
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state: CommentState, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchComments.rejected, (state: CommentState) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state: CommentState, action) => {
      state.items.push(action.payload);
      state.hasError = false;
    });

    builder.addCase(addComment.rejected, (state: CommentState) => {
      state.hasError = true;
    });

    builder.addCase(deleteComment.fulfilled, (state: CommentState, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });

    builder.addCase(deleteComment.rejected, (state: CommentState) => {
      state.hasError = true;
    });
  },
});

export const { clearComments } = commentsReducer.actions;
export default commentsReducer.reducer;
