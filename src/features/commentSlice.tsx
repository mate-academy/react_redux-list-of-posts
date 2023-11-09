/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComment = createAsyncThunk(
  'comment/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

type CommentType = {
  comments: Comment[],
  loading: boolean,
  error: boolean,
};

const initialState: CommentType = {
  comments: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },

    removeComment: (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },

    setCommentError: (state) => {
      state.error = true;
    },

    clearAllComment: (state) => {
      state.comments = [];
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComment.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchComment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {
  addComments,
  removeComment,
  setCommentError,
  clearAllComment,
} = postsSlice.actions;
export default postsSlice.reducer;
