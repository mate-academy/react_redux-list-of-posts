/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../../types/Comment';
import { getPostComments } from '../../../api/comments';
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

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },
    addComments: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchPostComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
export const { clearComments, addComments, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
