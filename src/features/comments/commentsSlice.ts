/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface Comments {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Comments = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/loadComments',
  async (id: number) => {
    const comments = getPostComments(id);

    return comments;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export const { addNewComment, deleteComment, setError } = commentSlice.actions;

export default commentSlice.reducer;
