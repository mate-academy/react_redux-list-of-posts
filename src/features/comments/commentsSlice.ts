/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (commnetsId: number) => {
    const comments = await getPostComments(commnetsId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { addComment, deleteComment, setError } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
