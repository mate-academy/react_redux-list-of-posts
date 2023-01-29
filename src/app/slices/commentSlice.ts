/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentState = {
  comments: [],
  status: 'idle',
};

export const getCommentsByPostId = createAsyncThunk(
  'comment/getAll',
  async (id: number) => {
    const comments = await getPostComments(id);

    return comments;
  },
);

export const deleteCommentById = createAsyncThunk(
  'comment/delete',
  async (id: number) => {
    await deleteComment(id);
  },
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const result = createComment(comment);

    return result;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    filterComment: (state: CommentState, action: PayloadAction<Comment>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload.id,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCommentsByPostId.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        getCommentsByPostId.fulfilled,
        (state: CommentState, action: PayloadAction<Comment[]>) => {
          state.status = 'idle';
          state.comments = [...action.payload];
        },
      )
      .addCase(getCommentsByPostId.rejected, state => {
        state.status = 'failed';
      })
      .addCase(addComment.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        addComment.fulfilled,
        (state: CommentState, action: PayloadAction<Comment>) => {
          state.status = 'idle';
          state.comments = [...state.comments, action.payload];
        },
      )
      .addCase(addComment.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { filterComment } = commentSlice.actions;

export default commentSlice.reducer;
