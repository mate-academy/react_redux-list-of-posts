/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment as deleteCommentById,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
  submitting: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
  submitting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // addSelectedPost: (state, action: PayloadAction<Post | null>) => {
    //   state.selectedPost = action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });

    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload,
        );
      },
    );

    builder.addCase(deleteComment.rejected, state => {
      state.error = 'Failed to delete comment!';
    });

    builder.addCase(addNewComment.pending, state => {
      state.submitting = true;
    });

    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.submitting = false;
    });

    builder.addCase(addNewComment.rejected, state => {
      state.error = 'Failed to create comment!';
      state.submitting = false;
    });
  },
});

export default commentsSlice;
// export const { addSelectedPost } = commentsSlice.actions;

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addNewComment = createAsyncThunk(
  'comments/create',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentById(commentId);

    return commentId;
  },
);
