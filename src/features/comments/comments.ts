import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchPostComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => getPostComments(postId),
);

export const addPostComment = createAsyncThunk(
  'post/comment',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const deletePostComment = createAsyncThunk(
  'delete/comment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

type InitialState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  comments: [],
  loaded: true,
  hasError: false,
};

const postsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.comments = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPostComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, { payload }) => {
      state.comments = payload;
      state.loaded = true;
    });
    builder.addCase(fetchPostComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addPostComment.fulfilled, (state, { payload }) => {
      state.comments = [...state.comments, payload];
    });
    builder.addCase(addPostComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(deletePostComment.fulfilled, (state, { payload }) => {
      state.comments = state.comments.filter(comment => comment.id !== payload);
    });

    builder.addCase(deletePostComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { clearComments } = postsSlice.actions;

export default postsSlice.reducer;
