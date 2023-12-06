/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../app/store';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const value = await commentsApi.getPostComments(postId);

    return value;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/create',
  async ({
    name,
    email,
    body,
    id: postId,
  }: CommentData & Pick<Post, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  (commendId: number) => {
    return commentsApi.deleteComment(commendId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loaded: false,
    hasError: false,
    items: [] as Comment[],
  },
  reducers: {
    setItems: (
      state,
      action: PayloadAction<Comment[]>,
    ) => ({ ...state, items: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(initComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(initComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(initComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(deleteCommentFromServer.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { setItems } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.items;

export const addComment = (comment: Comment): AppThunk => {
  return (dispatch, getState) => {
    const currentComments = selectComments(getState());

    dispatch(setItems([...currentComments, comment]));
  };
};

export const deleteComment = (commentId: number): AppThunk => {
  return (dispatch, getState) => {
    const currentComments = selectComments(getState());

    const newComments = currentComments.filter(
      comment => comment.id !== commentId,
    );

    // first we delete the comment from UI
    dispatch(setItems(newComments));
    // then we try to remove the comment from server
    dispatch(deleteCommentFromServer(commentId));
  };
};

export default commentsSlice.reducer;
