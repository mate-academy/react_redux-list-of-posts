/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: string;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: '',
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number, { rejectWithValue }) => {
    const answer = await deleteComment(commentId);

    if (answer === 1) {
      return commentId;
    } else {
      return rejectWithValue('Error');
    }
  },
);

export const postComment = createAsyncThunk(
  'comments/add',
  ({ name, email, body, postId }: CommentData) => {
    return createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = '';
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = 'Error, Failed to load comments';
      })
      .addCase(postComment.pending, state => {
        state.hasError = '';
      })
      .addCase(
        postComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(postComment.rejected, state => {
        state.hasError = 'Error, Failed to add comment';
      })
      .addCase(removeComment.pending, state => {
        state.hasError = '';
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<unknown>) => {
          state.items = state.items.filter(el => el.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = 'Error, Failed to remove comment';
      });
  },
});

export default commentsSlice.reducer;
