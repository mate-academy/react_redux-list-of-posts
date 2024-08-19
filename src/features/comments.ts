/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type InitialState = {
  loaded: boolean;
  items: Comment[];
  hasError: boolean;
};

const initialState: InitialState = {
  loaded: false,
  items: [],
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (userId: number) => {
    return getPostComments(userId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.items = action.payload;
        state.loaded = true;
      },
    );

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(
      addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      },
    );

    builder.addCase(addNewComment.rejected, state => {
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
