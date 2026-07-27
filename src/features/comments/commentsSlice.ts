/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';
import { AppThunk } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const res = await getPostComments(postId);

    return res;
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: true,
  hasError: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    causeError: (state, action: PayloadAction<string>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadComments.rejected, (state, action) => {
      state.loaded = true;
      state.hasError = action.error.message || '';
    });
  },
});

export default commentsSlice.reducer;

const { add, remove, causeError } = commentsSlice.actions;

export const deleteComment = (commentId: number): AppThunk => {
  return async dispatch => {
    dispatch(remove(commentId));

    await commentsApi.deleteComment(commentId);
  };
};

export const addComment = (
  { name, email, body }: CommentData,
  postId: number,
): AppThunk => {
  return async dispatch => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: postId,
      });

      dispatch(add(newComment));
    } catch (error) {
      dispatch(causeError('Error'));
      throw error;
    }
  };
};
