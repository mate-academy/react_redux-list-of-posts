/* eslint-disable no-param-reassign */
import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const create = createAsyncThunk(
  'comments/create',
  ({ postId, name, email, body }: Omit<Comment, 'id'>) => {
    return createComment({ postId, name, email, body });
  },
);

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const remove = createAsyncThunk(
  'comments/remove',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice: Slice<CommentsState> = createSlice({
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(create.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.meta.arg,
      );
    });

    builder.addCase(init.pending, state => {
      state.loaded = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
    });

    builder.addCase(init.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
