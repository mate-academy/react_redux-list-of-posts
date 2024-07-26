/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CounterState {
  value: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: [],
  status: 'loading',
};

export const asyncGetCommnets = createAsyncThunk(
  'comments/fetchComments',
  async (id: number) => {
    const value = await getPostComments(id).then(data => data);

    return value;
  },
);

export const asyncDeleteComment = createAsyncThunk(
  'comments/DeleteComment',
  async (commentId: number) => {
    const value = await deleteComment(commentId).then(data => data);

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    delComment: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(elem => elem.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.value = [...state.value, action.payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(asyncGetCommnets.pending, state => {
        state.status = 'loading';
      })
      .addCase(asyncGetCommnets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(asyncGetCommnets.rejected, state => {
        state.status = 'failed';
      })
      .addCase(asyncDeleteComment.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(asyncDeleteComment.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { delComment, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
