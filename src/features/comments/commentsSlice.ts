/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { Comment } from '../../types/Comment';
import * as commentsApi from '../../api/comments';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentsState {
  comments: Comment[];
  tempCommentsId: number[];
  hasError: boolean;
  loader: boolean;
}

const initialState: CommentsState = {
  comments: [],
  tempCommentsId: [],
  hasError: false,
  loader: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setTempComment: (state, action: PayloadAction<number>) => {
      state.tempCommentsId.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(addCommentThuck.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });

    builder.addCase(addCommentThuck.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deleteCommentThuck.fulfilled, state => {
      state.comments = state.comments.filter(comment => {
        if (state.tempCommentsId.includes(comment.id)) {
          state.tempCommentsId.filter(id => id !== comment.id);

          return false;
        }

        return true;
      });
    });

    builder.addCase(deleteCommentThuck.rejected, state => {
      state.tempCommentsId = [];
    });

    builder.addCase(init.pending, state => {
      state.loader = false;
      state.hasError = false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loader = true;
    });

    builder.addCase(init.rejected, state => {
      state.loader = true;
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;
export const { setTempComment } = commentsSlice.actions;

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return commentsApi.getPostComments(postId);
});

export const deleteCommentThuck = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const addCommentThuck = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);
