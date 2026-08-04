import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

type DeleteCommentPayload = {
  comment: Comment;
  index: number;
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => commentsApi.createComment(comment),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ comment }: DeleteCommentPayload) => {
    await commentsApi.deleteComment(comment.id);

    return comment.id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(loadComments.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.loaded = true;
          state.hasError = true;
        }
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.meta.arg.comment.id,
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        const { comment, index } = action.meta.arg;

        state.items.splice(index, 0, comment);
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
