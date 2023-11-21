/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const fetchedComments = await getPostComments(postId);

    return fetchedComments;
  });

export const addNewComment = createAsyncThunk('comments/createComment',
  async (data : Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

export const removeChoosenComment = createAsyncThunk('comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState,
      action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state: CommentsState,
      action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addNewComment.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
      })
      .addCase(removeChoosenComment.fulfilled, (state: CommentsState,
        action: PayloadAction<number>) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
