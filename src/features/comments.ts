/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  loaded: boolean;
  items: Comment[];
  hasError: boolean;
};

const initialState: CommentsState = {
  loaded: false,
  items: [],
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => getPostComments(postId),
);

export const addCommentThunk = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>, { rejectWithValue }) => {
    try {
      const newComment = await createComment(data);

      return newComment;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addCommentThunk.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addCommentThunk.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(deleteCommentThunk.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
