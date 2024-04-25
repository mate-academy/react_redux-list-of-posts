/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import * as commentsAPI from '../../api/comments';

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: boolean;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return commentsAPI.getPostComments(postId);
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
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    сlearComments: state => {
      state.comments = [];
    },
    setError: state => {
      state.error = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(loadComments.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default commentsSlice.reducer;
export const { addComment, removeComment, сlearComments, setError } =
  commentsSlice.actions;
