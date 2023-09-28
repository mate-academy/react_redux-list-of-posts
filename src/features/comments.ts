/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/add',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Error!';
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });
  },
});

export const { remove } = commentsSlice.actions;
export default commentsSlice.reducer;
