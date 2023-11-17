/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
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
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setError: (state) => {
      state.hasError = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { addComment, deleteComment, setError } = commentsSlice.actions;

export default commentsSlice.reducer;
