/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/SET',
  async (postId: number) => {
    const loadedcomments: Comment[] = await getPostComments(postId);

    return loadedcomments;
  },
);

export const addComment = createAsyncThunk(
  'comments/ADD',
  async (data: CommentData) => {
    const addedComment = await createComment(data);

    return addedComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/DELETE',
  async (commentId: number) => {
    const removedComment = await deleteComment(commentId);

    return removedComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(
      loadComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      },
    );

    builder.addCase(
      addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(
      removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      },
    );

    builder.addCase(loadComments.rejected, (state) => {
      state.status = 'failed';
      state.hasError = true;
    });
  },
});

export const { setComments, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
