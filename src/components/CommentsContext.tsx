import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
// import { start } from 'repl';

export type CommentPost = {
  comments: Comment[];
  selectedComment: Comment | null;
  loading: boolean;
  error: string;
};

const initialState: CommentPost = {
  comments: [],
  selectedComment: null,
  loading: false,
  error: '',
};

export const CommentsContext = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setSelectedComments(state, action: PayloadAction<Comment>) {
      state.selectedComment = action.payload;
      state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder.addCase(getComments.pending, state => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loading = false;
    });
    builder.addCase(getComments.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { setComments, setSelectedComments } = CommentsContext.actions;
export default CommentsContext.reducer;

export const getComments  = createAsyncThunk(`/commentsGet`, (selectedPost: number) => {
  return getPostComments(selectedPost);
});
// export const deletComment  = createAsyncThunk(`/commentsDel`, (selectedPost: number) => {
//   return deleteComment(selectedPost);
// });
// export const createComment  = createAsyncThunk(`/commentsCreate`, (selectedPost: number) => {
//   return deleteComment(selectedPost);
// });
