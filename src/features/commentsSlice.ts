/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type FetchSstatus = 'idle' | 'loading' | 'failed';

export interface CommentsState {
  comments: Comment[];
  status: {
    loadComments: FetchSstatus;
    addComments: FetchSstatus;
    deleteComments: FetchSstatus;
  };
}

const initialState: CommentsState = {
  comments: [],
  status: {
    loadComments: 'idle',
    addComments: 'idle',
    deleteComments: 'idle',
  },
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchPostComments',
  async (userId: number) => {
    const posts = getPostComments(userId);

    return posts;
  },
);

export const addNewCommentAsync = createAsyncThunk(
  'newComment/fetchCreateComment',
  async ({ name, email, body, postId }: CommentData) => {
    const newComment = await createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'deleteComment/fetchDeleteComment',
  async (commentId: number) => {
    const deleteReview = await deleteComment(commentId);

    return deleteReview;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(commentsAsync.pending, state => {
        state.status.loadComments = 'loading';
      })
      .addCase(commentsAsync.fulfilled, (state, action) => {
        state.status.loadComments = 'idle';
        state.comments = action.payload;
      })
      .addCase(commentsAsync.rejected, state => {
        state.status.loadComments = 'failed';
      });

    builder
      .addCase(addNewCommentAsync.pending, state => {
        state.status.addComments = 'loading';
      })
      .addCase(
        addNewCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.status.addComments = 'idle';
          state.comments.push(action.payload);
        },
      )
      .addCase(addNewCommentAsync.rejected, state => {
        state.status.addComments = 'failed';
      });

    builder
      .addCase(deleteCommentAsync.pending, state => {
        state.status.deleteComments = 'loading';
      })
      .addCase(
        deleteCommentAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status.deleteComments = 'idle';
          state.comments = state.comments.filter(
            comment => comment.id !== action.payload,
          );
        },
      )
      .addCase(deleteCommentAsync.rejected, state => {
        state.status.deleteComments = 'failed';
      });
  },
});

export const { add, remove } = commentsSlice.actions;

export default commentsSlice.reducer;
