import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments, deleteComment } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  error: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteCurrentComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.loaded = true;
      state.comments = action.payload;
    });
    builder.addCase(init.rejected, state => {
      state.loaded = true;
      state.error = true;
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      },
    );
    builder.addCase(addComment.rejected, state => {
      state.error = true;
    });
  },
});

export const addComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comment/deleteComment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export default commentsSlice.reducer;

export const { deleteCurrentComment } = commentsSlice.actions;
