/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const getCommentsByPostId = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const createNewComment = createAsyncThunk(
  'comments/create',
  (comment: Omit<Comment, 'id'>) => createComment(comment),
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<Comment>) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload.id;
      });

      deleteComment(action.payload.id);
    },
  },
  extraReducers: builder => builder
    .addCase(getCommentsByPostId.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    })

    .addCase(
      getCommentsByPostId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = false;
      },
    )

    .addCase(getCommentsByPostId.rejected, (state) => {
      state.hasError = true;
      state.loaded = false;
    })

    .addCase(createNewComment.pending, (state) => {
      state.loaded = true;
      state.hasError = false;
    })

    .addCase(
      createNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments = [...state.comments, action.payload];
        state.loaded = false;
      },
    )

    .addCase(createNewComment.rejected, (state) => {
      state.hasError = true;
      state.loaded = false;
    }),
});

export const { remove } = commentSlice.actions;

export default commentSlice.reducer;
