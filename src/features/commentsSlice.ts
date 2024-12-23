/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type State = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: State = {
  loaded: true,
  hasError: false,
  comments: [],
};

export const setComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    try {
      const comments = await getPostComments(postId);

      return comments;
    } catch (error) {
      throw error;
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setComments.pending, state => {
        state.loaded = false;
      })
      .addCase(setComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(setComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
