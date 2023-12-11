/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  isLoaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.isLoaded = true;
        })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.isLoaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
