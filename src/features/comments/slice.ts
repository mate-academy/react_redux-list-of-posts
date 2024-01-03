/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { addCommentAction, fetchComments, removeComment } from './thunks';

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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(
        addCommentAction.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(addCommentAction.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items
            .filter(comment => comment.id !== action.payload);
        },
      );
  },
});

export default commentsSlice.reducer;
