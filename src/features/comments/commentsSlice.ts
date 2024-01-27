/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  comments: [],
};

export const init = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action) => {
      state.comments = state.comments.filter(
        commment => commment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = [...state.comments, action.payload];
    });

    builder.addCase(addComment.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { remove } = commentsSlice.actions;
