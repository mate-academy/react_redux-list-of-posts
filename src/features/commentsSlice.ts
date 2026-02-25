/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number, thunkAPI) => {
    try {
      const comments = await getPostComments(postId);

      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load comments');
    }
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>, thunkAPI) => {
    try {
      const newComment = await createComment(data);

      return newComment;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add comment');
    }
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, thunkAPI) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete comment');
    }
  },
);

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = action.payload as string;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
