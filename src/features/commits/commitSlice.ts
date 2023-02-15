/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const downloadUsersComments = createAsyncThunk(
  'Comments/fetch',
  async (userId: number) => {
    const Comments = await getPostComments(userId);

    return Comments;
  },
);

const CommentsSlice = createSlice({
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
  extraReducers(builder) {
    builder.addCase(downloadUsersComments.pending, (state) => {
      state.comments = [];
      state.isLoading = true;
    });

    builder.addCase(downloadUsersComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    });

    builder.addCase(downloadUsersComments.rejected, (state) => {
      state.error = 'Error message';
      state.isLoading = false;
    });
  },
});

export const { addComment, deleteComment, setError } = CommentsSlice.actions;

export default CommentsSlice.reducer;
