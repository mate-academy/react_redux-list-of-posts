/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface Comments {
  loaded: boolean;
  comments: Comment[];
  hasError: string;
}

const initialState: Comments = {
  loaded: false,
  comments: [],
  hasError: '',
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.loaded = false;
      state.comments = [];
      state.hasError = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = '';
      state.loaded = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadComments.rejected, state => {
      state.hasError = 'something went wrong';
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loaded = true;
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = 'something went wrong';
      state.loaded = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      state.loaded = true;
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = 'something went wrong';
      state.loaded = true;
    });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
