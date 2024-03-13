/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPostComments } from '../../utils/thunks/fetchPostComments';
import { addPostComment } from '../../utils/thunks/addPostComment';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deletePostComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPostComments.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchPostComments.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
      state.comments = [];
    });
    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addPostComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { deletePostComment } = commentsSlice.actions;

export default commentsSlice.reducer;
