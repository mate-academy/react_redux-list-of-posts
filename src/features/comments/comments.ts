/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'get/fetchCommnet',
  getPostComments,
);

export const addComments = createAsyncThunk('post/fetchCommnet', createComment);

type State = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    deleteComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.comments = [];
      state.hasError = true;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addComments.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { setComment, deleteComments } = commentSlice.actions;
export default commentSlice.reducer;
