/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

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

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addCommentAction = createAsyncThunk(
  'comments/add',
  ({
    name,
    email,
    body,
    postId,
  }: Omit<Comment, 'id'>) => createComment({
    name,
    email,
    body,
    postId,
  }),
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (id: number) => {
    deleteComment(id);

    return id;
  },
);

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

export const selectCommentsState = (state: RootState) => state.comments;

export default commentsSlice.reducer;
