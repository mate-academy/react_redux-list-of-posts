/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import type { AppThunk } from '../../app/store';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsInfo = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsInfo = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comment/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const addedComment = await createComment(comment);

    return addedComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state: CommentsInfo, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export const { remove } = commentsSlice.actions;

export const removeComment = (commentId: number): AppThunk => {
  return (dispatch) => {
    dispatch(remove(commentId));
    deleteComment(commentId);
  };
};

export default commentsSlice.reducer;
