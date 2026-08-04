import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

type DeleteCommentPayload = {
  comment: Comment;
  index: number;
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  (comment: Omit<Comment, 'id'>) => commentsApi.createComment(comment),
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async ({ comment }: DeleteCommentPayload) => {
    await commentsApi.deleteComment(comment.id);

    return comment.id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(loadComments.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(loadComments.rejected, (state, action) => {
        if (action.meta.aborted) {
          return state;
        }

        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      })
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(deleteComment.pending, (state, action) => ({
        ...state,
        items: state.items.filter(
          comment => comment.id !== action.meta.arg.comment.id,
        ),
      }))
      .addCase(deleteComment.rejected, (state, action) => {
        const { comment, index } = action.meta.arg;

        return {
          ...state,
          items: [
            ...state.items.slice(0, index),
            comment,
            ...state.items.slice(index),
          ],
        };
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
