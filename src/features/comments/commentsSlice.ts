/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, removeData, BASE_URL } from '../../api/api';

const initialState: CommentsState = {
  comments: [],
  isCommentsLoading: false,
  isCommentsVisible: true,
};

export const getCommentsByPostId = createAsyncThunk(
  'comments/getCommentsByPostId',
  async (postId: number): Promise<Comment[]> => {
    return getData(`/comments?postId=${postId}`);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: NewComment) => {
    const {
      postId,
      name,
      email,
      body,
    } = comment;

    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({
          postId,
          name,
          email,
          body,
        }),
      });

      return await response.json();
    } catch (error) {
      throw new Error();
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    return removeData(`/comments/${commentId}`);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    changeCommentsVisibility: (state, action) => {
      state.isCommentsVisible = action.payload;
    },
  },
  extraReducers: {
    [getCommentsByPostId.pending.type]: (state: CommentsState) => {
      state.isCommentsLoading = true;
    },
    [getCommentsByPostId.fulfilled.type]: (state: CommentsState, action) => {
      state.isCommentsLoading = false;
      state.comments = action.payload;
    },
    [getCommentsByPostId.rejected.type]: (state: CommentsState) => {
      state.isCommentsLoading = false;
    },
    [addComment.pending.type]: (state: CommentsState) => {
      state.isCommentsLoading = true;
    },
    [addComment.fulfilled.type]: (state: CommentsState) => {
      state.isCommentsLoading = false;
    },
    [addComment.rejected.type]: (state: CommentsState) => {
      state.isCommentsLoading = false;
    },
    [deleteComment.pending.type]: (state: CommentsState) => {
      state.isCommentsLoading = true;
    },
    [deleteComment.fulfilled.type]: (state: CommentsState) => {
      state.isCommentsLoading = false;
    },
    [deleteComment.rejected.type]: (state: CommentsState) => {
      state.isCommentsLoading = false;
    },
  },
});

export const { changeCommentsVisibility } = commentsSlice.actions;
export default commentsSlice.reducer;
