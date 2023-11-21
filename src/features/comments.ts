/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[],
  loader: boolean,
  error: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loader: false,
  error: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    const postComments = await getPostComments(postId);

    return postComments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },

    deleteAllComments: (state) => {
      state.comments = [];
      state.error = false;
      state.loader = false;
    },

    setError: (state) => {
      state.error = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loader = true;
      state.error = false;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loader = false;
      state.error = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loader = false;
      state.comments = action.payload;
      state.error = false;
    });
  },
});

export default commentsSlice.reducer;
export const {
  addComment,
  removeComment,
  deleteAllComments,
  setError,
} = commentsSlice.actions;
