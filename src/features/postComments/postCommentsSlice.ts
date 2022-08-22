/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments, createComment, deleteComment }
  from '../../api/comments';
import { Comment } from '../../types/Comment';

interface NewComment {
  name: string,
  email: string,
  body: string,
}

interface NewCommentError {
  name: boolean,
  email: boolean,
  body: boolean,
}

export interface CommentsState {
  comments: Comment[],
  newComment: NewComment,
  newCommentError: NewCommentError,
  loaded: boolean,
  hasError: boolean,
  visible: boolean,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  comments: [],
  newComment: {
    name: '',
    email: '',
    body: '',
  },
  newCommentError: {
    name: false,
    email: false,
    body: false,
  },
  loaded: false,
  hasError: false,
  visible: false,
  status: 'idle',
};

export const loadPostComments = createAsyncThunk(
  'comments/loadComments',
  getPostComments,
);

export const addNewComment = createAsyncThunk(
  'comments/add',
  createComment,
);

export const deletePostComment = createAsyncThunk(
  'comments/deleteComment',
  deleteComment,
);

export const postCommentsSlice = createSlice({
  name: 'postComments',
  initialState,
  reducers: {
    setVisible: (state) => {
      state.visible = true;
    },
    setNewCommentField: (
      state,
      { payload }: PayloadAction<{
        key: 'name' | 'email' | 'body',
        value: string
      }>,
    ) => {
      state.newComment[payload.key] = payload.value;
    },
    clearNewComment: (state) => {
      state.newComment = initialState.newComment;
    },
    setNewCommentError: (
      state,
      { payload }: PayloadAction<NewCommentError>,
    ) => {
      state.newCommentError = { ...payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPostComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
      state.visible = false;
    })
      .addCase(loadPostComments.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.loaded = true;
      })
      .addCase(loadPostComments.rejected, (state) => {
        state.comments = [];
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addNewComment.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
        state.hasError = false;
      })
      .addCase(addNewComment.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(deletePostComment.pending, ({ comments }, { payload }) => {
        const commentIndex = comments.findIndex(({ id }) => id === payload);

        comments.splice(commentIndex, 1);
      });
  },
});

export default postCommentsSlice.reducer;
export const {
  setVisible,
  setNewCommentField,
  clearNewComment,
  setNewCommentError,
} = postCommentsSlice.actions;
