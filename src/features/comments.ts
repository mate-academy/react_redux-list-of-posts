/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { setPost } from './selectedPost';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk('comments/add', createComment);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(setPost, () => initialState);
  },
});

export default commentsSlice.reducer;
