/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const fetchDeleteComments = createAsyncThunk(
  'comments/fetchDeleteComments',
  async (commentId: number) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      throw new Error('Failed to delete comment');
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setCommentsError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      },
    );
    builder
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(fetchDeleteComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchDeleteComments.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(fetchDeleteComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
        state.items = state.items;
      });
  },
});

export default commentsSlice.reducer;
export const { addComments, removeComment, setCommentsError } =
  commentsSlice.actions;
