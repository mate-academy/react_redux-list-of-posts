/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

type CommentsState = {
  loading: boolean;
  error: string;
  deletingComment: null | Comment;
  comments: Comment[];
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  (commentId: number) => {
    deleteComment(commentId);
  },
);

const initialState: CommentsState = {
  loading: false,
  error: '',
  deletingComment: null,
  comments: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setDeletingComment: (state, action: PayloadAction<Comment>) => {
      state.deletingComment = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.comments = action.payload;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.error = 'Unable to load comments';
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.loading = false;
    });

    builder.addCase(addComment.pending, state => {
      state.loading = true;
    });

    builder.addCase(addComment.rejected, state => {
      state.error = 'Unable to add a comment';
      state.loading = false;
      throw new Error();
    });

    builder.addCase(removeComment.pending, state => {
      state.comments = state.comments.filter(
        comment => comment.id !== state.deletingComment?.id,
      );
      state.error = '';
    });

    builder.addCase(removeComment.rejected, state => {
      state.comments = [...state.comments, state.deletingComment as Comment];
      state.deletingComment = null;
      state.error = 'Unable to delete a todo';
    });

    builder.addCase(removeComment.fulfilled, state => {
      state.deletingComment = null;
      state.error = '';
    });
  },
});

export const { setComments, setDeletingComment } = commentSlice.actions;
export default commentSlice.reducer;
