/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsSlieceState = {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  hasError: boolean;
  loaded: boolean;
};

const initialState: CommentsSlieceState = {
  comments: [],
  status: 'idle',
  hasError: false,
  loaded: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commetId: number) => {
    deleteComment(commetId);

    return commetId;
  },
);

export const postComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const comment = await createComment(data);

    return comment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.status = 'idle';
          state.comments = action.payload;
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = 'idle';
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
        state.status = 'idle';
        state.loaded = true;
        state.hasError = false;
      });
  },
});
