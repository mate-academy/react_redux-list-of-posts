/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api/comments';
import { Comment } from '../types/Comment';

export const init = createAsyncThunk('comment/fetch', (id: number) =>
  api.getPostComments(id),
);

export const remove = createAsyncThunk('deleteComment/fetch', (id: number) =>
  api.deleteComment(id),
);

export const create = createAsyncThunk(
  'createComment/fetch',
  (data: Omit<Comment, 'id'>) => api.createComment(data),
);

type StateComments = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateComments = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loaded = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(init.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { removeComment } = commentsSlice.actions;
