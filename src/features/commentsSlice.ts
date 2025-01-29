/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { RootState } from '../app/store';

type CommentType = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  backup: Comment[];
};

const initialState: CommentType = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
  backup: [] as Comment[],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async (data: Omit<Comment, 'id'>) => {
    const comment = await createComment(data);

    return comment;
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deletePostComment',
  async (id: number) => {
    await deleteComment(id);

    return id;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addNewComment.rejected, state => {
        state.hasError = true;
      });

    builder
      .addCase(deletePostComment.pending, (state, action) => {
        state.backup = [...state.comments];

        commentsSlice.caseReducers.remove(state, {
          type: commentsSlice.actions.remove.type,
          payload: action.meta.arg,
        });
      })
      .addCase(deletePostComment.rejected, state => {
        state.comments = state.backup;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentStates = (state: RootState) => state.comments;
