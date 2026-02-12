/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: '',
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    removeComment(state, action: PayloadAction<number>) {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
