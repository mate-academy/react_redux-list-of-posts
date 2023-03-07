/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments, postComment, removeComment } from '../app/thunks';
import { Comment } from '../types/Comment';

export interface CommentsSliceIS {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsSliceIS = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    cancelComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(postComment.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { cancelComment } = commentsSlice.actions;
