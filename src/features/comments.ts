/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const initComments = createAsyncThunk('comments/fetch', (
  postId: number,
) => {
  return getPostComments(postId);
});

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  error: boolean,
};

const initialComments: CommentsState = {
  comments: [],
  loading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'posts',
  initialState: initialComments,
  reducers: {
    addComments: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
    setCommentsError: (state) => {
      state.error = true;
    },
    clearAllComments: (state) => {
      state.comments = [];
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(initComments.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(initComments.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  addComments, removeComment, setCommentsError, clearAllComments,
} = commentsSlice.actions;

export default commentsSlice.reducer;
