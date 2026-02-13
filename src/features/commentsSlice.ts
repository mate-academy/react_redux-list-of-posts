/* eslint-disable no-param-reassign */
import { LoadingStatuses } from '../enums/LoadingStatuses';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { handleItemsLoading, handleItemsSuccess } from '../helpers/helpers';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComment',
  async (id: number) => {
    const data = await getPostComments(id);

    return data;
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/addComment',
  (commentData: Omit<Comment, 'id'>) => {
    return createComment(commentData);
  },
);

export const deleteCommentById = createAsyncThunk<Comment[], number>(
  'comments/deleteComment',
  (id: number) => {
    return deleteComment(id);
  },
);

interface CommentsState {
  comments: Comment[];
  commentsLoadingStatus: LoadingStatuses;
}

const initialState: CommentsState = {
  comments: [],
  commentsLoadingStatus: LoadingStatuses.idle,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCommentLocally: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        handleItemsLoading(state, 'commentsLoadingStatus', 'loading');
      })
      .addCase(fetchComments.fulfilled, (state: CommentsState, action) => {
        handleItemsSuccess(
          state,
          'comments',
          action.payload,
          'commentsLoadingStatus',
        );
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        handleItemsLoading(state, 'commentsLoadingStatus', 'error');
      })
      .addCase(addComment.fulfilled, (state: CommentsState, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state: CommentsState) => {
        handleItemsLoading(state, 'commentsLoadingStatus', 'error');
      })
      .addCase(deleteCommentById.rejected, (state: CommentsState) => {
        handleItemsLoading(state, 'commentsLoadingStatus', 'error');
      });
  },
});

export const { deleteCommentLocally } = commentsSlice.actions;

export default commentsSlice.reducer;
