import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

export type DelCommentPost = {
  delComment: Comment | null;
  selectedDelComment: null | number;
  loading: boolean;
  error: string;
};

const initialState: DelCommentPost = {
  delComment: null,
  selectedDelComment: null,
  loading: false,
  error: '',
};

export const CommentsContext = createSlice({
  name: 'delComment',
  initialState,
  reducers: {
    setSelectedComment: (state, action: PayloadAction<number>) => {
      console.log(typeof action.payload);
      state.selectedDelComment = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(deleteSelectedComment.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteSelectedComment.fulfilled, (state, action) => {
      state.delComment = action.payload;
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