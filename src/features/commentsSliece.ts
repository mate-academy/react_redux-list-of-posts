import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },

    deleteComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    },
    setCommentsError(state, action: PayloadAction<boolean>) {
      state.hasError = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })

      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })

      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, setCommentsError } =
  commentsSlice.actions;
