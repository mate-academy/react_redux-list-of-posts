/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const initComments = createAsyncThunk('comment/fetch', (id: number) => {
  return commentsApi.getPostComments(id);
});

export const deleteComments = createAsyncThunk(
  'deleteComment/fetch',
  (id: number) => {
    return commentsApi.deleteComment(id);
  },
);

export const createComments = createAsyncThunk(
  'createComment/fetch',
  (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initComments.pending, state => {
        state.loaded = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(initComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { deleteComment } = commentsSlice.actions;
