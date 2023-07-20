/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const commentsData = await getPostComments(postId);

    return commentsData;
  });

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state: CommentsState, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    clearComments: (state: CommentsState) => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
