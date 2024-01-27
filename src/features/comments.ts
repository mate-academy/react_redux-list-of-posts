/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean,
  comments: Comment[],
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const postComments = await getPostComments(postId);

    return postComments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    clearComments: (state) => {
      state.comments = [];
      state.loaded = false;
      state.hasError = false;
    },
    setError: (state) => {
      state.hasError = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default commentsSlice.reducer;
export const {
  clearComments, setError, addComment, removeComment,
} = commentsSlice.actions;
