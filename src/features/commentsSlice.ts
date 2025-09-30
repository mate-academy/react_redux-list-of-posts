/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },

    removeComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
