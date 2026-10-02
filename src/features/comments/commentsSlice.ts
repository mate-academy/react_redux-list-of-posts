/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
export const loadComments = createAsyncThunk('comments/load', (id: number) =>
  getPostComments(id),
);
const slice = createSlice({
  name: 'comments',
  initialState: { loaded: false, hasError: false, items: [] as Comment[] },
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setCommentsError: state => {
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.items = [];
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, (state, action) => {
        if (!action.meta.aborted) {
          state.hasError = true;
          state.loaded = true;
        }
      });
  },
});

export const { addComment, removeComment, setCommentsError } = slice.actions;
export default slice.reducer;
