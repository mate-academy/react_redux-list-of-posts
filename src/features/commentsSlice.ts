/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  hasError: boolean;
  loaded: boolean;
  loadingNewComment: boolean;
};

const initialState: CommentsState = {
  comments: [],
  hasError: false,
  loaded: false,
  loadingNewComment: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchCurrentPost',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const commentsSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {
    deleteCommentClient: (state, { payload }: PayloadAction<number>) => {
      if (state.comments) {
        state.comments = state.comments?.filter(
          comment => comment.id !== payload,
        );
      }
    },
    addCommentClient: (state, { payload }) => {
      state.comments?.push(payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
    builder.addCase(addComment.pending, state => {
      state.loadingNewComment = true;
    });
    builder.addCase(addComment.fulfilled, state => {
      state.loadingNewComment = false;
    });
    builder.addCase(addComment.rejected, state => {
      state.loadingNewComment = false;
    });
  },
});

const { deleteCommentClient, addCommentClient } = commentsSlice.actions;

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { dispatch }) => {
    dispatch(deleteCommentClient(commentId));

    await deleteComment(commentId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, 'id'>, { dispatch }) => {
    const createdComment = await createComment(newComment);

    dispatch(addCommentClient(createdComment));
  },
);

export default commentsSlice.reducer;
