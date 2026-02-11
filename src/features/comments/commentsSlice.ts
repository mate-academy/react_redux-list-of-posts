/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      state.items = [];
      state.loaded = false;
      state.hasError = false;
    },

    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },

    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },

    restoreComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchCommentsByPostId.rejected, state => {
        state.items = [];
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const {
  clearComments,
  addComment,
  removeComment,
  setCommentsError,
  restoreComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
