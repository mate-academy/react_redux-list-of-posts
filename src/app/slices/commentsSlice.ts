/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

type Users = {
  comments: Comment[];
  loading: boolean;
  error: string
};

const initialState: Users = {
  comments: [],
  loading: false,
  error: '',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending || initAddComment.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.rejected || initAddComment.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(initAddComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const { deleteComment } = commentsSlice.actions;

export const init = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const initAddComment = createAsyncThunk(
  'addComment/fetch',
  (newComment: CommentData) => commentsApi.createComment(newComment),
);

export const initDeleteComment = (commentId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteComment(commentId));

    await commentsApi.deleteComment(commentId);
  };
};
