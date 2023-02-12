/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[],
  isLoading: boolean,
  error: string,
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: '',
};

export const loadPostComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlicce = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments
        = state.comments.filter(comment => comment.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostComments.pending, (state) => {
        state.comments = [];
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        loadPostComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(loadPostComments.rejected, (state) => {
        state.isLoading = false;
        state.error = "Can't load comments";
      });
  },
});

export const { addComment, setError, deleteComment } = commentsSlicce.actions;
export default commentsSlicce.reducer;
