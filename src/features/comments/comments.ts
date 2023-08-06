/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type State = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchGettingComments = createAsyncThunk(
  'getComments/fetch', (id: number) => {
    return getPostComments(id);
  },
);

export const fetchCreatingComments = createAsyncThunk(
  'createComments/fetch', (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const fetchDeletingComments = createAsyncThunk(
  'deleteComments/fetch', (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentary: (state, action) => {
      state.comments
      = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGettingComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchGettingComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchGettingComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(fetchCreatingComments.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(fetchCreatingComments.rejected, (state) => {
      state.hasError = true;
    });

    builder.addCase(fetchDeletingComments.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const { deleteCommentary } = commentsSlice.actions;
export default commentsSlice.reducer;
