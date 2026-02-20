/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { RootState } from '../app/store';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getPostCommentsAsync = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
    return getPostComments(postId);
  },
);

export const addCommentAsync = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/addComment', async data => {
  const newComment = await createComment(data);

  return newComment;
});

export const deleteCommentAsync = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPostCommentsAsync.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(getPostCommentsAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(getPostCommentsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addCommentAsync.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteCommentAsync.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(deleteCommentAsync.rejected, state => {
      state.hasError = true;
    });
  },
});

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
