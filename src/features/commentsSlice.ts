/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/createComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment: Comment = await createComment(data);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })

      .addCase(addComment.pending, state => {
        state.hasError = false;
      })

      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )

      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })

      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(comm => comm.id !== action.payload);
        },
      )
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
