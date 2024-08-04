/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loading: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const writeComment = createAsyncThunk(
  'comments/writeComment',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice: Slice<CommentsState> = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(fetchComments.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });

    builder.addCase(
      writeComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.loading = false;
      },
    );

    builder.addCase(writeComment.rejected, state => {
      state.loading = false;
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
