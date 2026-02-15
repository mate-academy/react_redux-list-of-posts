/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

type InitialStateType = {
  loaded: boolean;
  hasError: boolean;
  comments: Comment[];
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/load',
  (postId: number) => {
    return getPostComments(postId);
  },
);

const initialState: InitialStateType = {
  loaded: false,
  hasError: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.comments = action.payload;
        state.loaded = true;
        state.hasError = false;
      },
    );
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addNewComment, removeComment } = commentsSlice.actions;
