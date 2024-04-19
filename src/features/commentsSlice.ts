/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  isVisible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  isVisible: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        item => item.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
export const { setVisible } = commentsSlice.actions;
/* eslint-enable no-param-reassign */
