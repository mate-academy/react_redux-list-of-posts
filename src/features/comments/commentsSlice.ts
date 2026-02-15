/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

const initialState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchAll',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: CommentData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const postId = state.selectedPost?.id;

      if (!postId) {
        throw new Error('Post not selected');
      }

      const value = await createComment({ ...data, postId });

      if (
        typeof value === 'object' &&
        value !== null &&
        'statusCode' in value
      ) {
        return rejectWithValue('Server error');
      }

      return value;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      const value = await deleteComment(commentId);

      if (
        typeof value === 'object' &&
        value !== null &&
        'statusCode' in value
      ) {
        return rejectWithValue('Server error');
      }

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
  extraReducers: builder => {
    builder.addCase(commentsAsync.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(commentsAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(commentsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(el => action.payload !== el.id);
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
