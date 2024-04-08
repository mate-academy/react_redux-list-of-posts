/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { addComment } from './NewCommentFormAPI';
import { Comment, CommentData } from '../../types/Comment';

type NewCommentFormState = {
  item: CommentData;
  loaded: boolean;
  hasError: boolean;
};

const initialState: NewCommentFormState = {
  item: {
    name: '',
    email: '',
    body: '',
  },
  loaded: false,
  hasError: false,
};

export const addItemComment = createAsyncThunk(
  'comments/addComment',
  (comment: Omit<Comment, 'id'>) => {
    return addComment(comment);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addItemComment.pending, state => {
      state.loaded = true;
    });

    builder.addCase(addItemComment.fulfilled, (state, action) => {
      state.item = action.payload;
      state.loaded = false;
    });

    builder.addCase(addItemComment.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
