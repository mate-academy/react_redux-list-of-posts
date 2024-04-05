/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const loadCommentsAsync = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },

    clearComments: state => {
      state.comments = [];
    },

    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },

    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },

    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(loadCommentsAsync.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadCommentsAsync.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(loadCommentsAsync.pending, state => {
      state.loaded = false;
    });
  },
});

export const {
  setComment,
  deleteComment,
  clearComments,
  setLoaded,
  setHasError,
  setVisible,
} = commentsSlice.actions;
export default commentsSlice.reducer;
