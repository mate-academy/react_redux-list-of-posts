/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (data: Omit<Comment, 'id'>) => createComment(data),
);

export const removeComment = createAsyncThunk(
  'comment/remove',
  (commentId: number) => deleteComment(commentId),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    takeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        loadComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.comments = action.payload;
          state.status = 'idle';
          state.loaded = true;
        },
      )
      .addCase(loadComments.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )
      .addCase(addComment.rejected, (state) => {
        state.hasError = true;
      });

    builder
      .addCase(removeComment.pending, (state) => {
        state.hasError = false;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action) => {
          state.comments = state.comments
            .filter(comment => comment.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { takeComment, setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
