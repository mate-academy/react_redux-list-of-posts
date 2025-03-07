/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const commentsInit = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentInit = createAsyncThunk(
  'comments/AddComments',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

const initialState = {
  comments: [] as Comment[],
  loading: false,
  buttonLoading: false,
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentDelete(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      deleteComment(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(commentsInit.pending, state => {
      state.loading = true;
    });
    builder.addCase(commentsInit.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(commentsInit.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
    builder.addCase(addCommentInit.pending, state => {
      state.buttonLoading = true;
    });
    builder.addCase(addCommentInit.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.buttonLoading = false;
    });
  },
});

export default commentsSlice.reducer;
