/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postID: number) => {
    return getPostComments(postID);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comment/deleteComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCurComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(
      initComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(initComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );

    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { deleteCurComment } = commentsSlice.actions;
