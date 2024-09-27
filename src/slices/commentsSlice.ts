/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const fetchAllComments = createAsyncThunk<Comment[], number>(
  'comments/fetchAllComments',
  async postId => {
    try {
      const response = await getPostComments(postId);

      return response;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  },
);

export const fetchCreateComments = createAsyncThunk<
  Comment,
  Omit<Comment, 'id'>
>('comments/fetchCreateComments', async data => {
  try {
    const response = await createComment(data);

    return response;
  } catch (error) {
    throw new Error('Failed to create comment');
  }
});

export const fetchDeleteComments = createAsyncThunk(
  'comments/fetchDeleteComments',
  async (commentId: number) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  },
);

type StateProps = {
  loaded: boolean;
  hasError: boolean;
  item: Comment[];
};

const initialState: StateProps = {
  loaded: false,
  hasError: false,
  item: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.item = action.payload;
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fetchAllComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.item = [];
      })
      .addCase(fetchCreateComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchCreateComments.fulfilled, (state, action) => {
        state.item.push(action.payload);
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fetchCreateComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.item = state.item;
      })
      .addCase(fetchDeleteComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchDeleteComments.fulfilled, (state, action) => {
        state.item = state.item.filter(
          comment => comment.id !== action.payload,
        );
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fetchDeleteComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.item = state.item;
      });
  },
});

export default commentSlice.reducer;
