import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const init = createAsyncThunk('comments/init', (postId: number) => {
  return getPostComments(postId);
});

export const addCommentAsync = createAsyncThunk(
  'comments/addComment',
  (data: { name: string; email: string; body: string; postId: number }) => {
    return createComment(data);
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments(state) {
      state.items = [];
      state.loaded = false;
      state.hasError = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = true;
      state.hasError = '';
    });
    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = false;
      },
    );
    builder.addCase(init.rejected, state => {
      state.loaded = false;
      state.hasError = 'Failed to load comments';
    });
    builder.addCase(
      addCommentAsync.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.hasError = '';
      },
    );
    builder.addCase(addCommentAsync.rejected, state => {
      state.hasError = 'Failed to add a comment';
    });
    builder.addCase(
      deleteCommentAsync.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.hasError = '';
      },
    );
    builder.addCase(deleteCommentAsync.rejected, state => {
      state.hasError = 'Failed to delete comment';
    });
  },
});

export default commentsSlice.reducer;
export const { clearComments } = commentsSlice.actions;
