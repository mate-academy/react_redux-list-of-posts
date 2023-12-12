import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Comment } from '../types/Comment';

import { getPostComments, createComment } from '../api/comments';

export const fetchComments = createAsyncThunk('comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  });

export const addNewComment = createAsyncThunk('addNewComment/fetch',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => {
        return item.id !== action.payload;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addNewComment.pending, (state) => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(addNewComment.rejected, (state) => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export const { deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
