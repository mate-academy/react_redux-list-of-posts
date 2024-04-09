import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

export type CommentPost = {
  comments: Comment | null;
  selectedDelComment: null | number;
  loading: boolean;
  error: string;
};

const initialState: CommentPost = {
  comments: null,
  selectedDelComment: null,
  loading: false,
  error: '',
};

export const CommentsContext = createSlice({
  name: 'delComment',
  initialState,
  reducers: {
    setSelectedComment: (state, action) => {
      state.selectedDelComment = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteSelectedComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteSelectedComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      
    });
    builder.addCase(deleteSelectedComment.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { setSelectedComment } = CommentsContext.actions;
export default CommentsContext.reducer;

// type DeleteSelectedCommentType = (postId: number) => void;

export const deleteSelectedComment = createAsyncThunk('/commentsDel', (selectedComment: number) => {
    return deleteComment(selectedComment);
  }
);