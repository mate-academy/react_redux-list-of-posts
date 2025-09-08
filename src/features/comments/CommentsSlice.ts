import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { addComment, deleteCommentThunk, loadComments } from './Thunks';

type CommentsState = {
  loading: boolean;
  comments: Comment[];
  error: string;
};

const initialState: CommentsState = {
  loading: false,
  comments: [],
  error: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      return {
        ...state,
        comments: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => ({
      ...state,
      error: '',
      loading: true,
    }));
    builder.addCase(loadComments.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loading: false,
    }));
    builder.addCase(loadComments.rejected, (state, action) => ({
      ...state,
      error: action.error.message || '',
      loading: false,
    }));
    builder.addCase(addComment.fulfilled, (state, action) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }));
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => ({
      ...state,
      comments: state.comments.filter(c => c.id !== action.payload),
    }));
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading;
export const selectCommentsError = (state: RootState) => state.comments.error;
export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;
