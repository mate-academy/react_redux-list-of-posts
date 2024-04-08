/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { delComment, fetchComments } from './CommentsAPI';
import { Comment } from '../../types/Comment';
import { addItemComment } from '../NewCommentForm/NewCommentFormSlice';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsInit = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return fetchComments(postId);
  },
);

export const commentDelete = createAsyncThunk(
  'comments/delComment',
  (commentId: number) => {
    return delComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(commentsInit.pending, state => {
      state.loaded = true;
    });

    builder.addCase(commentsInit.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(commentsInit.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addItemComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loaded = false;
    });

    builder.addCase(commentDelete.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export default commentsSlice.reducer;
