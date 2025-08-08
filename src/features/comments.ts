import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

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

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (id: number) => {
    return commentsApi.getPostComments(id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Comment) => {
    return commentsApi.createComment(comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (id: number) => {
    await commentsApi.deleteComment(id);

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
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
