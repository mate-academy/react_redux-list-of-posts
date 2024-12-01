/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

const initialState = {
  comments: [] as Comment[],
  hasError: false,
  loaded: true,
};

export const setComments = createAsyncThunk(
  'comments/setComments',
  (userId: number) => {
    return getPostComments(userId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  // (data: Omit<Comment, 'id'>) => {
  //   return createComment(data);
  // },
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);
export const removeComment = createAsyncThunk(
  'comments/delete',
  // (commentId: number) => {
  //   return deleteComment(commentId);
  // },
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(setComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(setComments.rejected, state => {
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
        comment => comment.id !== action.payload,
      );
    });
    builder.addCase(removeComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
