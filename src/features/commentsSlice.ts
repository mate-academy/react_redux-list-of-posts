/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Maybe } from '../types/Maybe';

type CurrentPostState = {
  selectedPostId: Maybe<number>;
  comments: { [key: string]: Comment[] };
  commentsIsLoading: boolean;
  commentsIsError: Maybe<string>;
};

const initialState: CurrentPostState = {
  selectedPostId: null,
  comments: {},
  commentsIsLoading: false,
  commentsIsError: null,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'currentPost/fetch_comments',
  getPostComments,
);

export const deleteCommentById = createAsyncThunk(
  'currentPost/delete_comment',
  deleteComment,
);

export const addComment = createAsyncThunk(
  'currentPost/add_comment',
  createComment,
);

export const commentsSlice = createSlice({
  name: 'currentPostState',
  initialState,
  reducers: {
    setSelectedPostId: (state, action: PayloadAction<Maybe<number>>) => {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsIsError = null;
      state.commentsIsLoading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments[action.meta.arg] = action.payload;
      state.commentsIsLoading = false;
    });

    builder.addCase(fetchComments.rejected, (state, action) => {
      state.commentsIsError = action.error.name || null;
      state.commentsIsLoading = false;
    });

    builder.addCase(deleteCommentById.pending, (state, action) => {
      const id = state.selectedPostId || 0;

      state.comments[id] = state.comments[id].filter(comment => (
        comment.id !== action.meta.arg
      ));
    });

    builder.addCase(addComment.pending, (state, action) => {
      const id = state.selectedPostId || 0;

      state.comments[id].push({
        ...action.meta.arg,
        id: -(state.comments[id].length),
      });
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const id = state.selectedPostId || 0;
      const fakeId = -(state.comments[id].length - 1);

      state.comments[id] = state.comments[id].map(comment => (
        comment.id === fakeId ? action.payload : comment
      ));
    });
  },
});

export const { setSelectedPostId } = commentsSlice.actions;
export default commentsSlice.reducer;
