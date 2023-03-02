/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments } from '../api/comments';

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

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.hasError = false;
      state.comments = action.payload;
    });
    builder.addCase(loadComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      });
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { remove, setError } = commentsSlice.actions;
