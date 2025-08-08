import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: false,
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
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
