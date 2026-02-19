/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../../api/comments';
import { Comment, CommentData } from '../../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchByPost',
  async (postId, { rejectWithValue }) => {
    try {
      return await commentsApi.getPostComments(postId);
    } catch {
      return rejectWithValue('Failed to load comments');
    }
  },
);

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number }
>('comments/add', async (data, { rejectWithValue }) => {
  try {
    return await commentsApi.createComment(data);
  } catch {
    return rejectWithValue('Failed to add comment');
  }
});

export const removeComment = createAsyncThunk<number, number>(
  'comments/remove',
  async (id, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(id);

      return id;
    } catch {
      return rejectWithValue('Failed to remove comment');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
