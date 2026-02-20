import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    deleteComment(state, action: PayloadAction<Comment['id']>) {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
