/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type State = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state: State, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initComments.pending, (state) => {
      state.loaded = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
        state.hasError = false;
      },
    );

    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { remove } = commentsSlice.actions;
