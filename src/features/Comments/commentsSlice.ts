/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
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

export const AsyncGetCommnets = createAsyncThunk(
  'comments/fetchCommnets',
  async (id: number) => {
    const value = await getPostComments(id).then(data => data);

    return value;
  },
);

export const AsyncdeleteComment = createAsyncThunk(
  'comments/DeleteCommnet',
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
      .addCase(AsyncGetCommnets.pending, state => {
        state.status = 'loading';
      })
      .addCase(AsyncGetCommnets.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(AsyncGetCommnets.rejected, state => {
        state.status = 'failed';
      })
      .addCase(AsyncdeleteComment.pending, state => {
        state.status = 'loading';
      })
      .addCase(AsyncdeleteComment.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(AsyncdeleteComment.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { delComment, addComment } = commentsSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;
export default commentsSlice.reducer;
