/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  isLoaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const postComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
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
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.isLoaded = true;
        })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.isLoaded = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(postComment.pending, state => {
        state.isLoaded = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
